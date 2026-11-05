import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import TypeBadge from '../components/TypeBadge';
import { COLORS } from '../components/theme';
import { pickDisplayMoves } from '../services/pokeApi';

export default function PokemonDetailsScreen({ route, navigation }) {
  const { pokemon } = route.params;
  const moves = pickDisplayMoves(pokemon.rawMoves, 6);

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader />

      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Image source={{ uri: pokemon.sprite }} style={styles.sprite} />
          <View>
            <Text style={styles.pokeId}>#{String(pokemon.id).padStart(3, '0')}</Text>
            <Text style={styles.pokeName}>{pokemon.name}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4, gap: 6 }}>
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>MOVIMENTOS</Text>

        {moves.length === 0 ? (
          <Text style={styles.statusText}>Não foi possível carregar os dados.</Text>
        ) : (
          <FlatList
            data={moves}
            keyExtractor={(item) => item.rawName}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.moveRow}
                onPress={() => navigation.navigate('MoveDetails', { move: item })}
              >
                <View style={styles.moveDot} />
                <Text style={styles.moveName}>{item.name}</Text>
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
  backButton: { marginBottom: 16 },
  backArrow: { fontSize: 22, color: COLORS.textDark },
  headerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  sprite: { width: 110, height: 110, marginRight: 16 },
  pokeId: { color: COLORS.textMuted, fontSize: 13 },
  pokeName: { fontWeight: 'bold', fontSize: 22, color: COLORS.textDark, marginVertical: 2 },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
    color: COLORS.textDark,
  },
  statusText: { textAlign: 'center', marginTop: 12, color: COLORS.textMuted },
  moveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  moveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.dotOrange,
    marginRight: 12,
  },
  moveName: { flex: 1, fontWeight: '600', fontSize: 15, color: COLORS.textDark },
  chevron: { fontSize: 22, color: '#C7C7C7' },
});