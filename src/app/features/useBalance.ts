import { Contract } from 'ethers';
import ABI from '@data/abis/Loot.json';
import getJsonRpcProvider from './getJsonRpcProvider';
import { useWallet } from '@gimmixorg/use-wallet';
import { useEffect, useState } from 'react';

export const getBalance = async (address: string) => {
  const contract = new Contract(
    '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
    ABI,
    getJsonRpcProvider()
  );
  const balance = await contract.functions.balanceOf(address);
  return parseInt(balance[0]._hex);
};

const useBalance = () => {
  const { account } = useWallet();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (account) getBalance(account).then(balance => setBalance(balance));
  }, [account]);
  return balance;
};

export default useBalance;
