import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Image } from 'expo-image';
import { Song } from '../data/semifinal1';
import { RatingButtons } from './RatingButtons';
import { ScoreDisplay } from './ScoreDisplay';
import { useRatings } from '../hooks/useRatings';

interface Props {
  song: Song;
  semifinalId: string;
  username: string | null;
}

export function SongCard({ song, semifinalId, username }: Props) {
  const { ratings, myRating, average, setRating } = useRatings(semifinalId, song.id, username);

  const thumbnailUrl = `https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${song.youtubeId}`;

  function openYouTube() {
    Linking.openURL(youtubeUrl);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.position}>#{song.position}</Text>
        <Text style={styles.flag}>{song.flag}</Text>
        <Text style={styles.country}>{song.country}</Text>
      </View>

      <View style={styles.body}>
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.info}>
          <Text style={styles.artist} numberOfLines={2}>{song.artist}</Text>
          <Text style={styles.title} numberOfLines={2}>"{song.title}"</Text>
          <TouchableOpacity style={styles.ytBtn} onPress={openYouTube} activeOpacity={0.8}>
            <Text style={styles.ytBtnText}>▶ YouTube</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ratingSection}>
        <RatingButtons value={myRating} onChange={setRating} />
        <ScoreDisplay ratings={ratings} average={average} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e0f3a',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3a2a5e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  position: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
    minWidth: 28,
  },
  flag: {
    fontSize: 22,
  },
  country: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  body: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#2a1a4e',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  artist: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    color: '#b39ddb',
    fontSize: 13,
    fontStyle: 'italic',
  },
  ytBtn: {
    backgroundColor: '#ff0000',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  ytBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  ratingSection: {
    borderTopWidth: 1,
    borderTopColor: '#3a2a5e',
    paddingTop: 10,
  },
});
