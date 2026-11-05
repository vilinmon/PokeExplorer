const BASE_URL = 'https://pokeapi.co/api/v2';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Busca os detalhes de um pokemon
// Endpoint: GET /pokemon/{nome ou id}
export async function fetchPokemonDetails(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados do Pokémon.');
  }
  const data = await response.json();

  const sprite =
    data.sprites.front_default ||
    data.sprites.other?.['official-artwork']?.front_default;

  return {
    id: data.id,
    name: capitalize(data.name),
    rawName: data.name,
    sprite,
    types: data.types.map((t) => t.type.name),
    rawMoves: data.moves,
  };
}

// Busca uma página de Pokémon para a Tela 1
export async function fetchPokemonList(limit = 20, offset = 0) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar a lista de Pokémon.');
  }
  const data = await response.json();

  const detailedList = await Promise.all(
    data.results.map((item) => fetchPokemonDetails(item.name))
  );

  return detailedList;
}

export function pickDisplayMoves(rawMoves, max = 6) {
  const levelUpMoves = rawMoves
    .map((moveEntry) => {
      const levelUpInfo = moveEntry.version_group_details.find(
        (detail) => detail.move_learn_method.name === 'level-up'
      );
      if (!levelUpInfo) return null;
      return {
        rawName: moveEntry.move.name,
        name: capitalize(moveEntry.move.name.replace(/-/g, ' ')),
        level: levelUpInfo.level_learned_at,
      };
    })
    .filter((move) => move !== null)
    .sort((a, b) => a.level - b.level);

  return levelUpMoves.slice(0, max);
}

// Busca os detalhes de um movimento específico para a Tela 3
// Endpoint: GET /move/{nome}
export async function fetchMoveDetails(rawName) {
  const response = await fetch(`${BASE_URL}/move/${rawName}`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados do movimento.');
  }
  const data = await response.json();

  const englishFlavorText = data.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  );

  return {
    type: data.type.name,
    category: capitalize(data.damage_class ? data.damage_class.name : '—'),
    power: data.power ?? '—',
    accuracy: data.accuracy != null ? `${data.accuracy}%` : '—',
    pp: data.pp ?? '—',
    description: englishFlavorText
      ? englishFlavorText.flavor_text.replace(/[\n\f]/g, ' ')
      : 'Sem descrição disponível.',
  };
}