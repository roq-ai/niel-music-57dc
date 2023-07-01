import * as yup from 'yup';

export const playlistMusicValidationSchema = yup.object().shape({
  playlist_id: yup.string().nullable(),
  music_id: yup.string().nullable(),
});
