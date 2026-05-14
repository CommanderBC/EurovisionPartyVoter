import { useState, useEffect } from 'react';
import { Vote, subscribeToSongVotes, setRating as firestoreSetRating } from '../firebase/ratings';
import { useUser } from './useUser';

export function useRatings(semifinalId: string, songId: string) {
  const { userId, username } = useUser();
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    return subscribeToSongVotes(semifinalId, songId, setVotes);
  }, [semifinalId, songId]);

  const myRating = userId ? (votes.find(v => v.userId === userId)?.score ?? null) : null;

  const average =
    votes.length > 0
      ? votes.reduce((sum, v) => sum + v.score, 0) / votes.length
      : null;

  async function setRating(score: number) {
    if (!userId || !username) return;
    await firestoreSetRating(semifinalId, songId, userId, username, score);
  }

  return { votes, myRating, average, setRating };
}
