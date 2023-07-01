const mapping: Record<string, string> = {
  companies: 'company',
  music: 'music',
  playlists: 'playlist',
  'playlist-musics': 'playlist_music',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
