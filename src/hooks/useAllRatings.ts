import { useState, useEffect } from 'react';
import { Song } from '../data/semifinals';
import { SemifinalVotes, Vote, subscribeToSemifinalVotes } from '../firebase/ratings';

export interface RankedSong {
  song: Song;
  votes: Vote[];
  average: number | null;
  voteCount: number;
}

export function useAllRatings(semifinalId: string, songs: Song[]): RankedSong[] {
  const [allVotes, setAllVotes] = useState<SemifinalVotes>({});

  useEffect(() => {
    return subscribeToSemifinalVotes(semifinalId, setAllVotes);
  }, [semifinalId]);

  return songs
    .map(song => {
      const votes = allVotes[song.id] ?? [];
      const average = votes.length > 0
        ? votes.reduce((a, v) => a + v.score, 0) / votes.length
        : null;
      return { song, votes, average, voteCount: votes.length };
    })
    .sort((a, b) => {
      if (a.average === null && b.average === null) return a.song.position - b.song.position;
      if (a.average === null) return 1;
      if (b.average === null) return -1;
      return b.average - a.average;
    });
}
