import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { playlistMusicValidationSchema } from 'validationSchema/playlist-musics';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.playlist_music
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPlaylistMusicById();
    case 'PUT':
      return updatePlaylistMusicById();
    case 'DELETE':
      return deletePlaylistMusicById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlaylistMusicById() {
    const data = await prisma.playlist_music.findFirst(convertQueryToPrismaUtil(req.query, 'playlist_music'));
    return res.status(200).json(data);
  }

  async function updatePlaylistMusicById() {
    await playlistMusicValidationSchema.validate(req.body);
    const data = await prisma.playlist_music.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePlaylistMusicById() {
    const data = await prisma.playlist_music.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
