import axios from 'axios';
import queryString from 'query-string';
import { PlaylistMusicInterface, PlaylistMusicGetQueryInterface } from 'interfaces/playlist-music';
import { GetQueryInterface } from '../../interfaces';

export const getPlaylistMusics = async (query?: PlaylistMusicGetQueryInterface) => {
  const response = await axios.get(`/api/playlist-musics${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlaylistMusic = async (playlistMusic: PlaylistMusicInterface) => {
  const response = await axios.post('/api/playlist-musics', playlistMusic);
  return response.data;
};

export const updatePlaylistMusicById = async (id: string, playlistMusic: PlaylistMusicInterface) => {
  const response = await axios.put(`/api/playlist-musics/${id}`, playlistMusic);
  return response.data;
};

export const getPlaylistMusicById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/playlist-musics/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlaylistMusicById = async (id: string) => {
  const response = await axios.delete(`/api/playlist-musics/${id}`);
  return response.data;
};
