import { DivineRobesIds } from '@server/data/DivineRobes';
import prisma from '@server/helpers/prisma';
import {
  addToServer,
  getAccessToken,
  getProfile
} from '@server/services/Discord';
import { getBagsInWallet } from 'loot-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state }: { code?: string; state?: string } = req.query;
  if (!code || !state) return res.redirect('/unauthorized');

  const accessToken = await getAccessToken(code);
  if (!accessToken) return res.status(403).json({ error: 'Invalid token' });
  const profile = await getProfile(accessToken);

  const user = await prisma.user.findUnique({ where: { id: state } });
  if (!user) return res.redirect('/unauthorized');

  // reconfirm user has permissions
  const bags = await getBagsInWallet(user.address.toLowerCase());
  const filteredBags = bags.filter(bag => DivineRobesIds.includes(bag.id));
  if (!filteredBags.length) return res.redirect('/unauthorized');

  await prisma.user.update({
    where: { id: user.id },
    data: { discordId: profile.id, inServer: true, username: profile.username }
  });
  await addToServer(profile.id, accessToken);
  return res.redirect('/welcome');
};

export default api;
