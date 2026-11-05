import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTypeColor } from './theme';

export default function TypeBadge({ type }) {
  return (
    <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
      <Text style={styles.text}>{type.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});