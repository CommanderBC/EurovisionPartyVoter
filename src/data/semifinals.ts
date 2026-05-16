import { semifinal1Songs } from './semifinal1';
import { semifinal2Songs } from './semifinal2';
import { finalSongs } from './final';

export interface Song {
  id: string;
  position: number;
  country: string;
  flag: string;
  artist: string;
  title: string;
  youtubeId: string;
}

export interface Semifinal {
  id: string;
  label: string;
  date: string;
  songs: Song[];
}

export const semifinals: Semifinal[] = [
  { id: 'sf1', label: 'Deltävling 1', date: '13 maj 2026', songs: semifinal1Songs },
  { id: 'sf2', label: 'Deltävling 2', date: '14 maj 2026', songs: semifinal2Songs },
  { id: 'sf3', label: 'Final',         date: '16 maj 2026', songs: finalSongs },
];

export function getSemifinal(id: string): Semifinal | undefined {
  return semifinals.find(s => s.id === id);
}
