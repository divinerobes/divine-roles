import prisma from '@server/helpers/prisma';
import {
  addRoleForUser,
  AdminRoleID,
  getRolesForUser,
  removeFromServer,
  removeRoleForUser,
  RolesToIDs
} from '@server/services/Discord';
import dayjs from 'dayjs';
import { getBagsInWallet } from 'loot-sdk';
import { NextApiHandler } from 'next';

const api: NextApiHandler = async (_req, res) => {
  const usersToRefresh = await prisma.user.findMany({
    where: {
      discordId: { not: null },
      lastChecked: { lt: dayjs().subtract(1, 'minute').toDate() }
    }
  });
  for (const user of usersToRefresh) {
    const bags = await getBagsInWallet(user.address.toLowerCase());
    const filteredBags = bags.filter(bag =>
      bag.chest.toLowerCase().includes('divine robe')
    );
    console.log(
      `${user.username} ${user.address} has ${
        filteredBags.length
      } robes: (${filteredBags.map(bag => bag.chest).join(', ')})`
    );
    if (filteredBags.length == 0 && user.inServer) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastChecked: new Date(), inServer: false, robes: [] }
      });
      try {
        console.log(`Removing ${user.username} from server`);
        await removeFromServer(user.id);
      } catch (err) {
        console.log(err);
      }
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastChecked: new Date(),
          inServer: true,
          robes: filteredBags.map(bag => bag.chest)
        }
      });
      if (user.discordId && user.inServer) {
        const newRoleIds = filteredBags
          .map(bag => bag.chest)
          .map(name => RolesToIDs[name]);
        const { roles: existingRoleIds }: { roles: string[] } =
          await getRolesForUser(user.discordId);
        const toRemove =
          existingRoleIds?.filter(x => !newRoleIds?.includes(x)) || [];
        const toAdd =
          newRoleIds?.filter(x => !existingRoleIds?.includes(x)) || [];
        for (const roleId of toRemove) {
          if (roleId == AdminRoleID) continue;
          await new Promise(resolve => setTimeout(resolve, 100));
          console.log('Removing role for user', roleId, user.discordId);
          await removeRoleForUser(roleId, user.discordId);
        }
        for (const roleId of toAdd) {
          if (roleId == AdminRoleID) continue;
          await new Promise(resolve => setTimeout(resolve, 100));
          console.log('Adding role for user', roleId, user.discordId);
          await addRoleForUser(roleId, user.discordId);
        }
      }
    }
  }
  return res.json({ success: true });
};

export default api;
