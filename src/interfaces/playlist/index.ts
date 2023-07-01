import { PlaylistMusicInterface } from 'interfaces/playlist-music';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PlaylistInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  playlist_music?: PlaylistMusicInterface[];
  user?: UserInterface;
  _count?: {
    playlist_music?: number;
  };
}

export interface PlaylistGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
