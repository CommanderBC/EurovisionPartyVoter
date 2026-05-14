import {
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';

export interface Vote {
  userId: string;
  name: string;
  score: number;
}

export type SemifinalVotes = Record<string, Vote[]>;

interface StoredEntry {
  score: number;
  name: string;
}

type StoredDoc = Record<string, StoredEntry | number>;

const UPPER_SENTINEL = String.fromCharCode(0xf8ff);

function normalize(data: StoredDoc | undefined): Vote[] {
  if (!data) return [];
  const votes: Vote[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'number') {
      votes.push({ userId: key, name: key, score: value });
    } else if (value && typeof value === 'object' && typeof value.score === 'number') {
      votes.push({ userId: key, name: value.name || key, score: value.score });
    }
  }
  return votes;
}

function parseSongId(docId: string, semifinalId: string): string | null {
  const prefix = `${semifinalId}_`;
  return docId.startsWith(prefix) ? docId.slice(prefix.length) : null;
}

export function subscribeToSemifinalVotes(
  semifinalId: string,
  callback: (votes: SemifinalVotes) => void,
): () => void {
  const prefix = `${semifinalId}_`;
  const q = query(
    collection(db, 'ratings'),
    where(documentId(), '>=', prefix),
    where(documentId(), '<', prefix + UPPER_SENTINEL),
  );
  return onSnapshot(q, (snap) => {
    const result: SemifinalVotes = {};
    snap.forEach((d) => {
      const songId = parseSongId(d.id, semifinalId);
      if (songId) result[songId] = normalize(d.data() as StoredDoc);
    });
    callback(result);
  });
}

export function subscribeToSongVotes(
  semifinalId: string,
  songId: string,
  callback: (votes: Vote[]) => void,
): () => void {
  const ref = doc(db, 'ratings', `${semifinalId}_${songId}`);
  return onSnapshot(ref, (snap) => {
    callback(normalize(snap.data() as StoredDoc | undefined));
  });
}

export async function setRating(
  semifinalId: string,
  songId: string,
  userId: string,
  name: string,
  score: number,
): Promise<void> {
  const ref = doc(db, 'ratings', `${semifinalId}_${songId}`);
  await setDoc(ref, { [userId]: { score, name } }, { merge: true });
}
