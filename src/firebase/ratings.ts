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

interface StoredVote {
  score: number;
  name: string;
}

interface LegacyEntry {
  score: number;
  name: string;
}

type LegacyDoc = Record<string, LegacyEntry | number>;

const UPPER_SENTINEL = String.fromCharCode(0xf8ff);

function normalizeLegacy(data: LegacyDoc | undefined): Vote[] {
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

function mergeVotes(legacy: Vote[], current: Vote[]): Vote[] {
  const map = new Map<string, Vote>();
  for (const v of legacy) map.set(v.userId, v);
  for (const v of current) map.set(v.userId, v);
  return Array.from(map.values());
}

function parseVoteId(voteId: string, semifinalPrefix: string): { songId: string; userId: string } | null {
  if (!voteId.startsWith(semifinalPrefix)) return null;
  const rest = voteId.slice(semifinalPrefix.length);
  const uIdx = rest.indexOf('_u_');
  if (uIdx === -1) return null;
  return { songId: rest.slice(0, uIdx), userId: rest.slice(uIdx + 1) };
}

export function subscribeToSemifinalVotes(
  semifinalId: string,
  callback: (votes: SemifinalVotes) => void,
): () => void {
  const prefix = `${semifinalId}_`;
  let currentVotes: SemifinalVotes = {};
  let legacyVotes: SemifinalVotes = {};

  function emit() {
    const merged: SemifinalVotes = {};
    const songIds = new Set([...Object.keys(currentVotes), ...Object.keys(legacyVotes)]);
    songIds.forEach((songId) => {
      merged[songId] = mergeVotes(legacyVotes[songId] ?? [], currentVotes[songId] ?? []);
    });
    callback(merged);
  }

  const currentQ = query(
    collection(db, 'votes'),
    where(documentId(), '>=', prefix),
    where(documentId(), '<', prefix + UPPER_SENTINEL),
  );
  const unsubCurrent = onSnapshot(currentQ, (snap) => {
    const result: SemifinalVotes = {};
    snap.forEach((d) => {
      const parsed = parseVoteId(d.id, prefix);
      if (!parsed) return;
      const data = d.data() as StoredVote;
      if (typeof data?.score !== 'number') return;
      (result[parsed.songId] ??= []).push({
        userId: parsed.userId,
        name: data.name || parsed.userId,
        score: data.score,
      });
    });
    currentVotes = result;
    emit();
  });

  const legacyQ = query(
    collection(db, 'ratings'),
    where(documentId(), '>=', prefix),
    where(documentId(), '<', prefix + UPPER_SENTINEL),
  );
  const unsubLegacy = onSnapshot(legacyQ, (snap) => {
    const result: SemifinalVotes = {};
    snap.forEach((d) => {
      const songId = d.id.slice(prefix.length);
      result[songId] = normalizeLegacy(d.data() as LegacyDoc);
    });
    legacyVotes = result;
    emit();
  });

  return () => {
    unsubCurrent();
    unsubLegacy();
  };
}

export function subscribeToSongVotes(
  semifinalId: string,
  songId: string,
  callback: (votes: Vote[]) => void,
): () => void {
  const prefix = `${semifinalId}_${songId}_`;
  let currentVotes: Vote[] = [];
  let legacyVotes: Vote[] = [];

  function emit() {
    callback(mergeVotes(legacyVotes, currentVotes));
  }

  const currentQ = query(
    collection(db, 'votes'),
    where(documentId(), '>=', prefix),
    where(documentId(), '<', prefix + UPPER_SENTINEL),
  );
  const unsubCurrent = onSnapshot(currentQ, (snap) => {
    const result: Vote[] = [];
    snap.forEach((d) => {
      const userId = d.id.slice(prefix.length);
      const data = d.data() as StoredVote;
      if (typeof data?.score !== 'number') return;
      result.push({ userId, name: data.name || userId, score: data.score });
    });
    currentVotes = result;
    emit();
  });

  const legacyRef = doc(db, 'ratings', `${semifinalId}_${songId}`);
  const unsubLegacy = onSnapshot(legacyRef, (snap) => {
    legacyVotes = normalizeLegacy(snap.data() as LegacyDoc | undefined);
    emit();
  });

  return () => {
    unsubCurrent();
    unsubLegacy();
  };
}

export async function setRating(
  semifinalId: string,
  songId: string,
  userId: string,
  name: string,
  score: number,
): Promise<void> {
  const ref = doc(db, 'votes', `${semifinalId}_${songId}_${userId}`);
  await setDoc(ref, { score, name });
}
