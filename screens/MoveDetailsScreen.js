import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import TypeBadge from '../components/TypeBadge';
import { COLORS } from '../components/theme';
import { fetchMoveDetails } from '../services/pokeApi';

export default function MoveDetailsScreen({ route, navigation }) {
  const { move } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchMoveDetails(move.rawName)
      .then((data) => setDetails(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [move]);

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader />

      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {loading && <Text style={styles.statusText}>Carregando...</Text>}
        {error && <Text style={styles.statusText}>Não foi possível carregar os dados.</Text>}

        {!loading && !error && details && (
          <>
            <Text style={styles.moveName}>{move.name}</Text>
            <View style={styles.badgeCenter}>
              <TypeBadge type={details.type} />
            </View>

            <View style={styles.statsTable}>
              <View style={[styles.statRow, styles.statRowBorder]}>
                <Text style={styles.statLabel}>Categoria</Text>
                <Text style={styles.statValue}>{details.category}</Text>
              </View>
              <View style={[styles.statRow, styles.statRowBorder]}>
                <Text style={styles.statLabel}>Poder</Text>
                <Text style={styles.statValue}>{details.power}</Text>
              </View>
              <View style={[styles.statRow, styles.statRowBorder]}>
                <Text style={styles.statLabel}>Precisão</Text>
                <Text style={styles.statValue}>{details.accuracy}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>PP</Text>
                <Text style={styles.statValue}>{details.pp}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>DESCRIÇÃO</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{details.description}</Text>
            </View>
          </>
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
  statusText: { textAlign: 'center', marginTop: 24, color: COLORS.textMuted },
  moveName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.textDark,
    marginTop: 12,
  },
  badgeCenter: { alignItems: 'center', marginVertical: 10 },
  statsTable: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
    overflow: 'hidden',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  statRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  statLabel: { fontWeight: 'bold', color: COLORS.textDark, fontSize: 15 },
  statValue: { color: COLORS.textDark, fontSize: 15 },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 12,
    color: COLORS.textDark,
  },
  descriptionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  descriptionText: { color: COLORS.textDark, fontSize: 14, lineHeight: 20 },
});