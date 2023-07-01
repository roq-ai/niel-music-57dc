import { PlaylistMusicInterface } from 'interfaces/playlist-music';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface MusicInterface {
  id?: string;
  title: string;
  artist: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  playlist_music?: PlaylistMusicInterface[];
  company?: CompanyInterface;
  _count?: {
    playlist_music?: number;
  };
}

export interface MusicGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  artist?: string;
  company_id?: string;
}
