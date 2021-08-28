import { providers } from 'ethers';

const getJsonRpcProvider = () => {
  return new providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/b95f6330bfdd4f5d8960db9d1d3da676'
  );
};

export default getJsonRpcProvider;
