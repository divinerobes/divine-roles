export const getProfile = async (
  accessToken: string
): Promise<{
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
}> => {
  const { user } = await fetch('https://discord.com/api/oauth2/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.json());
  return user;
};

export const getAccessToken = async (code: string) => {
  const body = {
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
    grant_type: 'authorization_code',
    scope: 'identify guilds.join',
    code
  };
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'post',
    body: Object.keys(body)
      .map(
        key =>
          encodeURIComponent(key) + '=' + encodeURIComponent((body as any)[key])
      )
      .join('&'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }).then(res => res.json());
  return (response?.access_token as string) || null;
};

export const getLoginURL = (state: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string
  }&redirect_uri=${encodeURIComponent(
    process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI as string
  )}&response_type=code&scope=identify%20guilds.join&state=${state}`;

export const addToServer = async (userID: string, accessToken: string) => {
  const body = {
    access_token: accessToken
  };
  await fetch(
    `https://discord.com/api/v8/guilds/${
      process.env.DISCORD_SERVER_ID as string
    }/members/${userID}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => {
    if (res.status == 201) return res.json();
    else return res.text();
  });
};

export const removeFromServer = async (userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${
      process.env.DISCORD_SERVER_ID as string
    }/members/${userID}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => {
    if (res.status == 201) return res.json();
    else return res.text();
  });
};

export const getRolesForUser = async (userId: string) => {
  return await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json());
};

export const setRolesForUser = async (roles: string[], userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roles })
    }
  ).then(res => res.json());
};
export const addRoleForUser = async (roleId: string, userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.text());
};
export const removeRoleForUser = async (roleId: string, userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.text());
};

export const RolesToIDs: Record<string, string> = {
  'Divine Robe': '881425623833276506',
  'Divine Robe of Power': '881425733443014667',
  'Divine Robe of Detection': '881425780578590741',
  'Divine Robe of Perfection': '881425839076573185',
  'Divine Robe of Reflection': '881425866977079346',
  'Divine Robe of Fury': '881425900963528714',
  'Divine Robe of Vitriol': '881425925919604737',
  'Divine Robe of Rage': '881425956395446272',
  'Divine Robe of the Fox': '881425974288326676',
  'Divine Robe of Skill': '881425995024973834',
  'Divine Robe of Brilliance': '881426015262490654',
  'Divine Robe of Titans': '881426035642626048',
  'Divine Robe of Protection': '881426056974843914',
  'Divine Robe of Enlightenment': '881426082497179659',
  'Divine Robe of the Twins': '881426115959349269',
  'Divine Robe of Anger': '881426135961980979',
  'Divine Robe of Giants': '881427638386827274'
};

export const AdminRoleID = '881277625820127232';
