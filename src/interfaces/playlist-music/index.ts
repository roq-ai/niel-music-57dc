import { PlaylistInterface } from 'interfaces/playlist';
import { MusicInterface } from 'interfaces/music';
import { GetQueryInterface } from 'interfaces';

export interface PlaylistMusicInterface {
  id?: string;
  playlist_id?: string;
  music_id?: string;
  created_at?: any;
  updated_at?: any;

  playlist?: PlaylistInterface;
  music?: MusicInterface;
  _count?: {};
}

export interface PlaylistMusicGetQueryInterface extends GetQueryInterface {
  id?: string;
  playlist_id?: string;
  music_id?: string;
}
