import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { playlistValidationSchema } from 'validationSchema/playlists';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPlaylists();
    case 'POST':
      return createPlaylist();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlaylists() {
    const data = await prisma.playlist
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'playlist'));
    return res.status(200).json(data);
  }

  async function createPlaylist() {
    await playlistValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.playlist_music?.length > 0) {
      const create_playlist_music = body.playlist_music;
      body.playlist_music = {
        create: create_playlist_music,
      };
    } else {
      delete body.playlist_music;
    }
    const data = await prisma.playlist.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
