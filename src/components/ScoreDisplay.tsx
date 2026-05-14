import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RatingsMap } from '../firebase/ratings';

interface Props {
  ratings: RatingsMap;
  average: number | null;
}

export function ScoreDisplay({ ratings, average }: Props) {
  const entries = Object.entries(ratings);

  if (entries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Ingen har betygsatt än</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {average !== null && (
        <Text style={styles.average}>⭐ {average.toFixed(1)}</Text>
      )}
      <View style={styles.grid}>
        {entries.map(([name, score]) => (
          <View key={name} style={styles.entry}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.score}>{score}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  empty: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
  average: {
    color: '#f9c74f',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a1a4e',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    minWidth: '45%',
    flexShrink: 1,
  },
  name: {
    color: '#ccc',
    fontSize: 12,
    flex: 1,
  },
  score: {
    color: '#e040fb',
    fontSize: 13,
    fontWeight: '700',
  },
});
