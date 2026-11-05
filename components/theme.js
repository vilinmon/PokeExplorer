// Cores centrais
export const COLORS = {
  primaryRed: '#dc0a2d',
  screenBackground: '#EDEDED',
  textDark: '#1F1F1F',
  textMuted: '#6B6B6B',
  border: '#E0E0E0',
  dotOrange: '#F2A93B',
  dotYellow: '#F5D033',
  dotCyan: '#5ED0E0',
};

// Cor de cada tipo de Pokémon, usada no componente TypeBadge
export const TYPE_COLORS = {
  normal: '#A0A29F',
  grass: '#5FBD58',
  poison: '#B763CF',
  ghost: '#5F6DBC',
  electric: '#F2D94E',
  fire: '#E2711D',
  water: '#539DDF',
};

export function getTypeColor(type) {
  return TYPE_COLORS[type] || COLORS.textMuted;
}