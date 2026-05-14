import { useState, useEffect } from 'react';
import { Song } from '../data/semifinal1';
import { RatingsMap, subscribeToRatings } from '../firebase/ratings';

export interface RankedSong {
  song: Song;
  ratings: RatingsMap;
  average: number | null;
  voteCount: number;
}

export function useAllRatings(semifinalId: string, songs: Song[]): RankedSong[] {
  const [ratingsMap, setRatingsMap] = useState<Record<string, RatingsMap>>({});

  useEffect(() => {
    const unsubs = songs.map(song =>
      subscribeToRatings(semifinalId, song.id, (ratings) => {
        setRatingsMap(prev => ({ ...prev, [song.id]: ratings }));
      })
    );
    return () => unsubs.forEach(u => u());
  }, [semifinalId]);

  return songs
    .map(song => {
      const ratings = ratingsMap[song.id] ?? {};
      const values = Object.values(ratings);
      const average = values.length > 0
        ? values.reduce((a, b) => a + b, 0) / values.length
        : null;
      return { song, ratings, average, voteCount: values.length };
    })
    .sort((a, b) => {
      if (a.average === null && b.average === null) return a.song.position - b.song.position;
      if (a.average === null) return 1;
      if (b.average === null) return -1;
      return b.average - a.average;
    });
}
