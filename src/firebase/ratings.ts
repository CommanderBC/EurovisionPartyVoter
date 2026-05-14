import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './config';

export type RatingsMap = Record<string, number>;

export function subscribeToRatings(
  semifinalId: string,
  songId: string,
  callback: (ratings: RatingsMap) => void,
): () => void {
  const ref = doc(db, 'ratings', `${semifinalId}_${songId}`);
  return onSnapshot(ref, (snap) => {
    callback((snap.data() as RatingsMap) ?? {});
  });
}

export async function setRating(
  semifinalId: string,
  songId: string,
  username: string,
  score: number,
): Promise<void> {
  const ref = doc(db, 'ratings', `${semifinalId}_${songId}`);
  await setDoc(ref, { [username]: score }, { merge: true });
}
