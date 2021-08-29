import { DivineRobesIds } from '@server/data/DivineRobes';
import prisma from '@server/helpers/prisma';
import {
  removeFromServer,
  RolesToIDs,
  setRolesForUser
} from '@server/services/Discord';
import dayjs from 'dayjs';
import { getBagsInWallet } from 'loot-sdk';
import { NextApiHandler } from 'next';

const api: NextApiHandler = async (_req, res) => {
  const usersToRefresh = await prisma.user.findMany({
    where: {
      discordId: { not: null },
      lastChecked: { lt: dayjs().subtract(10, 'seconds').toDate() },
      inServer: true
    }
  });
  for (const user of usersToRefresh) {
    const bags = await getBagsInWallet(user.address.toLowerCase());
    const filteredBags = bags.filter(bag => DivineRobesIds.includes(bag.id));
    if (filteredBags.length == 0) {
      try {
        await removeFromServer(user.id);
      } catch (err) {
        console.log(err);
      }
      await prisma.user.update({
        where: { id: user.id },
        data: { lastChecked: new Date(), inServer: false, robes: [] }
      });
      console.log(`Removed ${user.username} from server`);
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastChecked: new Date(),
          inServer: true,
          robes: filteredBags.map(bag => bag.chest)
        }
      });
      if (user.discordId) {
        await new Promise(resolve => setTimeout(resolve, 500));
        await setRolesForUser(
          filteredBags.map(bag => bag.chest).map(name => RolesToIDs[name]),
          user.discordId
        );
      }
    }
  }
  return res.json({ success: true });
};

export default api;
