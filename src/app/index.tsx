import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../hooks/useUser';
import { semifinals } from '../data/semifinals';

export default function HomeScreen() {
  const router = useRouter();
  const { username } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>🎤 Eurovision 2026</Text>
          {username && <Text style={styles.welcome}>Hej, {username}!</Text>}
        </View>

        {semifinals.map(semi => (
          <View key={semi.id} style={styles.section}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/semifinal/${semi.id}`)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardEmoji}>🌟</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{semi.label}</Text>
                <Text style={styles.cardSub}>{semi.songs.length} länder · {semi.date}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resultsCard}
              onPress={() => router.push(`/results/${semi.id}`)}
              activeOpacity={0.8}
            >
              <Text style={styles.resultsEmoji}>🏆</Text>
              <Text style={styles.resultsText}>Ranking – {semi.label}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  scroll: {
    padding: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  welcome: {
    color: '#b39ddb',
    fontSize: 15,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
    gap: 8,
  },
  card: {
    backgroundColor: '#1e0f3a',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#3a2a5e',
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    color: '#e040fb',
    fontSize: 28,
    fontWeight: '300',
  },
  resultsCard: {
    backgroundColor: '#150b28',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#2a1a4e',
  },
  resultsEmoji: {
    fontSize: 18,
  },
  resultsText: {
    color: '#b39ddb',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
