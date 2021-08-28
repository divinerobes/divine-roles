import { DivineRobesIds } from '@server/data/DivineRobes';
import prisma from '@server/helpers/prisma';
import { removeFromServer } from '@server/services/Discord';
import dayjs from 'dayjs';
import { getBagsInWallet } from 'loot-sdk';
import { NextApiHandler } from 'next';

const api: NextApiHandler = async (_req, res) => {
  const usersToRefresh = await prisma.user.findMany({
    where: {
      lastChecked: { lt: dayjs().subtract(1, 'seconds').toDate() },
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
        data: { lastChecked: new Date(), inServer: false }
      });
      console.log(`Removed ${user.username} from server`);
    }
  }
  return res.json({ success: true });
};

export default api;
