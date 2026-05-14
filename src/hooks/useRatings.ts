import { useState, useEffect } from 'react';
import { RatingsMap, subscribeToRatings, setRating as firestoreSetRating } from '../firebase/ratings';

export function useRatings(semifinalId: string, songId: string, username: string | null) {
  const [ratings, setRatings] = useState<RatingsMap>({});

  useEffect(() => {
    const unsub = subscribeToRatings(semifinalId, songId, setRatings);
    return unsub;
  }, [semifinalId, songId]);

  const myRating = username ? (ratings[username] ?? null) : null;

  const average =
    Object.keys(ratings).length > 0
      ? Object.values(ratings).reduce((sum, v) => sum + v, 0) / Object.values(ratings).length
      : null;

  async function setRating(score: number) {
    if (!username) return;
    await firestoreSetRating(semifinalId, songId, username, score);
  }

  return { ratings, myRating, average, setRating };
}
