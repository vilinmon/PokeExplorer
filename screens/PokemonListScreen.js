import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import TypeBadge from '../components/TypeBadge';
import { COLORS } from '../components/theme';
import { fetchPokemonList, fetchPokemonDetails } from '../services/pokeApi';

export default function PokemonListScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPokemonList(20, 0)
      .then((data) => setPokemonList(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      setSearchResult(null);
      setNotFound(false);
      setSearching(false);
      return;
    }

    let isCurrent = true;
    setSearching(true);
    setNotFound(false);

    const timeoutId = setTimeout(() => {
      fetchPokemonDetails(trimmedQuery.toLowerCase())
        .then((data) => {
          if (isCurrent) setSearchResult(data);
        })
        .catch(() => {
          if (isCurrent) {
            setSearchResult(null);
            setNotFound(true);
          }
        })
        .finally(() => {
          if (isCurrent) setSearching(false);
        });
    }, 500);

    return () => {
      isCurrent = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  const dataToShow = query.trim() ? (searchResult ? [searchResult] : []) : pokemonList;

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader />

      <View style={styles.body}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar Pokémon..."
            placeholderTextColor="#9A9A9A"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
        </View>

        {loading && <Text style={styles.statusText}>Carregando...</Text>}
        {error && <Text style={styles.statusText}>Não foi possível carregar os dados.</Text>}
        {searching && <Text style={styles.statusText}>Buscando...</Text>}
        {notFound && <Text style={styles.statusText}>Pokémon não encontrado.</Text>}

        {!loading && !error && !searching && !notFound && (
          <FlatList
            data={dataToShow}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}
              >
                <Image source={{ uri: item.sprite }} style={styles.sprite} />
                <View style={styles.cardInfo}>
                  <Text style={styles.pokeId}>#{String(item.id).padStart(3, '0')}</Text>
                  <Text style={styles.pokeName}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    {item.types.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.primaryRed },
  body: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
    borderRadius: 24,
    marginHorizontal: 12,
    marginBottom: 35,
    padding: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.textDark },
  statusText: { textAlign: 'center', marginTop: 24, color: COLORS.textMuted },
    card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    // Sombra (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // Sombra (Android)
    elevation: 1.90,
  },
  sprite: { width: 56, height: 56, marginRight: 12 },
  cardInfo: { flex: 1 },
  pokeId: { color: COLORS.textMuted, fontSize: 12, marginBottom: 2 },
  pokeName: { fontWeight: 'bold', fontSize: 16, color: COLORS.textDark, marginBottom: 6 },
  chevron: { fontSize: 26, color: '#C7C7C7', marginLeft: 4 },
});