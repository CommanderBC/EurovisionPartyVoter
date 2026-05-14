import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getSemifinal } from '../../data/semifinals';
import { useAllRatings, RankedSong } from '../../hooks/useAllRatings';

function getMedalColor(rank: number, hasRating: boolean) {
  if (!hasRating) return '#333';
  if (rank === 1) return '#FFD700';
  if (rank === 2) return '#C0C0C0';
  if (rank === 3) return '#CD7F32';
  return '#4a3a7e';
}

function ResultRow({ item, rank }: { item: RankedSong; rank: number }) {
  const hasRating = item.average !== null;
  const medalColor = getMedalColor(rank, hasRating);

  return (
    <View style={styles.row}>
      <View style={[styles.rank, { backgroundColor: medalColor }]}>
        <Text style={styles.rankText}>{hasRating ? rank : '–'}</Text>
      </View>
      <Text style={styles.flag}>{item.song.flag}</Text>
      <View style={styles.songInfo}>
        <Text style={styles.songCountry}>{item.song.country}</Text>
        <Text style={styles.songArtist} numberOfLines={1}>{item.song.artist}</Text>
        <Text style={styles.songTitle} numberOfLines={1}>"{item.song.title}"</Text>
      </View>
      <View style={styles.scoreBox}>
        {hasRating ? (
          <>
            <Text style={styles.scoreAvg}>{item.average!.toFixed(1)}</Text>
            <Text style={styles.scoreVotes}>{item.voteCount} röst{item.voteCount !== 1 ? 'er' : ''}</Text>
          </>
        ) : (
          <Text style={styles.scoreEmpty}>–</Text>
        )}
      </View>
    </View>
  );
}

export default function ResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const semi = getSemifinal(id);
  const ranked = useAllRatings(id, semi?.songs ?? []);

  const ratedCount = ranked.filter(r => r.average !== null).length;

  return (
    <>
      <Stack.Screen options={{ title: `${semi?.label ?? 'Resultat'} – Ranking` }} />
      <FlatList
        data={ranked}
        keyExtractor={(item) => item.song.id}
        renderItem={({ item, index }) => (
          <ResultRow item={item} rank={index + 1} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🏆 Ranking</Text>
            <Text style={styles.headerSub}>
              {ratedCount === 0
                ? 'Inga betyg ännu – sätt igång!'
                : `Baserat på ${ratedCount} av ${ranked.length} betygsatta låtar`}
            </Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 32,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSub: {
    color: '#888',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#1e0f3a',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#3a2a5e',
  },
  rank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  flag: {
    fontSize: 22,
  },
  songInfo: {
    flex: 1,
  },
  songCountry: {
    color: '#aaa',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  songArtist: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  songTitle: {
    color: '#b39ddb',
    fontSize: 12,
    fontStyle: 'italic',
  },
  scoreBox: {
    alignItems: 'center',
    minWidth: 44,
  },
  scoreAvg: {
    color: '#f9c74f',
    fontSize: 20,
    fontWeight: '800',
  },
  scoreVotes: {
    color: '#666',
    fontSize: 10,
  },
  scoreEmpty: {
    color: '#444',
    fontSize: 20,
    fontWeight: '700',
  },
});
