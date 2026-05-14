export interface Song {
  id: string;
  position: number;
  country: string;
  flag: string;
  artist: string;
  title: string;
  youtubeId: string;
}

export const semifinal1Songs: Song[] = [
  { id: 'moldova',    position: 1,  country: 'Moldavien',  flag: '🇲🇩', artist: 'Satoshi',                         title: 'Viva, Moldova!',      youtubeId: 'SViojHjNSzc' },
  { id: 'sweden',     position: 2,  country: 'Sverige',    flag: '🇸🇪', artist: 'FELICIA',                         title: 'My System',           youtubeId: 'ibbfS8iG450' },
  { id: 'croatia',    position: 3,  country: 'Kroatien',   flag: '🇭🇷', artist: 'LELEK',                           title: 'Andromeda',           youtubeId: 'vl7Jqnw10sU' },
  { id: 'greece',     position: 4,  country: 'Grekland',   flag: '🇬🇷', artist: 'Akylas',                          title: 'Ferto',               youtubeId: 'NGwNTd_DA9s' },
  { id: 'portugal',   position: 5,  country: 'Portugal',   flag: '🇵🇹', artist: 'Bandidos do Cante',               title: 'Rosa',                youtubeId: 'jyHaE6GqaaQ' },
  { id: 'georgia',    position: 6,  country: 'Georgien',   flag: '🇬🇪', artist: 'Bzikebi',                         title: 'On Replay',           youtubeId: 'coh-lygCINY' },
  { id: 'finland',    position: 7,  country: 'Finland',    flag: '🇫🇮', artist: 'Linda Lampenius & Pete Parkkonen', title: 'Liekinheitin',        youtubeId: '9bfwNIYb96Q' },
  { id: 'montenegro', position: 8,  country: 'Montenegro', flag: '🇲🇪', artist: 'Tamara Živković',                 title: 'Nova Zora',           youtubeId: 'nuvy2d60HbI' },
  { id: 'estonia',    position: 9,  country: 'Estland',    flag: '🇪🇪', artist: 'Vanilla Ninja',                   title: 'Too Epic to Be True', youtubeId: 'lOiWuol3t3o' },
  { id: 'israel',     position: 10, country: 'Israel',     flag: '🇮🇱', artist: 'Noam Bettan',                     title: 'Michelle',            youtubeId: 'xWCnWSoG8nI' },
  { id: 'belgium',    position: 11, country: 'Belgien',    flag: '🇧🇪', artist: 'ESSYLA',                          title: 'Dancing on the Ice',  youtubeId: '9sfI4g6DWTU' },
  { id: 'lithuania',  position: 12, country: 'Litauen',    flag: '🇱🇹', artist: 'Lion Ceccah',                     title: 'Sólo Quiero Más',     youtubeId: '0H-PXnbhG7A' },
  { id: 'san_marino', position: 13, country: 'San Marino', flag: '🇸🇲', artist: 'SENHIT feat. Boy George',         title: 'Superstar',           youtubeId: 'fuNuivCNeak' },
  { id: 'poland',     position: 14, country: 'Polen',      flag: '🇵🇱', artist: 'ALICJA',                          title: 'Pray',                youtubeId: 'q78cnYIoF9Y' },
  { id: 'serbia',     position: 15, country: 'Serbien',    flag: '🇷🇸', artist: 'LAVINA',                          title: 'Kraj Mene',           youtubeId: 'FJTLKBOOE98' },
];
