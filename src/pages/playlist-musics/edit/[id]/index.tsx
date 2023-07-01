import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPlaylistMusicById, updatePlaylistMusicById } from 'apiSdk/playlist-musics';
import { Error } from 'components/error';
import { playlistMusicValidationSchema } from 'validationSchema/playlist-musics';
import { PlaylistMusicInterface } from 'interfaces/playlist-music';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { PlaylistInterface } from 'interfaces/playlist';
import { MusicInterface } from 'interfaces/music';
import { getPlaylists } from 'apiSdk/playlists';
import { getMusic } from 'apiSdk/music';

function PlaylistMusicEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlaylistMusicInterface>(
    () => (id ? `/playlist-musics/${id}` : null),
    () => getPlaylistMusicById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PlaylistMusicInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePlaylistMusicById(id, values);
      mutate(updated);
      resetForm();
      router.push('/playlist-musics');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PlaylistMusicInterface>({
    initialValues: data,
    validationSchema: playlistMusicValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Playlist Music
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<PlaylistInterface>
              formik={formik}
              name={'playlist_id'}
              label={'Select Playlist'}
              placeholder={'Select Playlist'}
              fetcher={getPlaylists}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<MusicInterface>
              formik={formik}
              name={'music_id'}
              label={'Select Music'}
              placeholder={'Select Music'}
              fetcher={getMusic}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.title}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'playlist_music',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PlaylistMusicEditPage);
