import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { getSemifinal } from '../../data/semifinals';
import { SongCard } from '../../components/SongCard';

export default function SemifinalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const semi = getSemifinal(id);

  if (!semi) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Deltävling hittades inte</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: semi.label,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push(`/results/${id}`)}
              style={styles.resultsBtn}
            >
              <Text style={styles.resultsBtnText}>Resultat 🏆</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={semi.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongCard song={item} semifinalId={id} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {semi.songs.length} länder · {semi.date}
            </Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerText: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
  },
  resultsBtn: {
    marginRight: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  resultsBtnText: {
    color: '#e040fb',
    fontSize: 14,
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: '#aaa',
    fontSize: 16,
  },
});
