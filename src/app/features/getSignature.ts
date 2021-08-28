import { Web3Provider } from '@ethersproject/providers';

const getSignature = async (
  provider: Web3Provider,
  account: string,
  message: string
) => {
  return await provider.send('personal_sign', [message, account]);
};

export default getSignature;
