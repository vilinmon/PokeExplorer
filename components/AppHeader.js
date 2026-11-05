import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from './theme';

// Cabeçalho 
export default function AppHeader() {
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 400 110" preserveAspectRatio="none">
          <Path
            d="M 0 110 C 90 108 115 60 175 58 C 235 56 265 18 400 16"
            stroke="#1F1F1F"
            strokeWidth={3}
            fill="none"
          />
        </Svg>
      </View>

      <Pokeball />

      <View style={styles.lights}>
        <Light color={COLORS.dotOrange} />
        <Light color={COLORS.dotYellow} />
        <Light color={COLORS.dotCyan} />
      </View>

      <Text style={styles.title}>PokéExplorer</Text>
    </View>
  );
}

// Desenho da pokébola 
function Pokeball() {
  return (
    <View style={styles.pokeballOuter}>
      <View style={styles.pokeballTop} />
      <View style={styles.pokeballBottom} />
      <View style={styles.pokeballBand} />
      <View style={styles.pokeballButton}>
        <View style={styles.pokeballButtonInner} />
      </View>
    </View>
  );
}

// 3 "luzes" decorativas
function Light({ color }) {
  return (
    <View style={[styles.light, { backgroundColor: color }]}>
      <View style={styles.lightShine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryRed,
    paddingTop: 50,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  pokeballOuter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#1F1F1F',
  },
  pokeballTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#E3350D',
  },
  pokeballBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#F5F5F5',
  },
  pokeballBand: {
    position: 'absolute',
    top: '50%',
    marginTop: -2,
    width: '100%',
    height: 4,
    backgroundColor: '#1F1F1F',
  },
  pokeballButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -7,
    marginLeft: -7,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeballButtonInner: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#F5F5F5',
  },
  lights: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  light: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  lightShine: {
    position: 'absolute',
    top: 1,
    left: 1.5,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  title: {
    marginLeft: 'auto',
    color: '#fff',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
  },
});