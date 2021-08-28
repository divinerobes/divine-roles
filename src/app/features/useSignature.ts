import { useWallet } from '@gimmixorg/use-wallet';
import getSignature from './getSignature';
import { useStore } from './useStore';

export const SIGNATURE_TEXT = 'Click Sign to verify your Divine Role.';

const useSignature = () => {
  const { provider, account } = useWallet();
  const signature = useStore(state => state.signature);

  const promptSignature = async (): Promise<string | undefined> => {
    if (!provider || !account || signature != undefined) return;
    useStore.setState({ signature: undefined });
    const _signature = await getSignature(
      provider,
      account,
      SIGNATURE_TEXT.toString()
    );
    useStore.setState({ signature: _signature });
    return _signature;
  };

  const resetSignature = () => {
    useStore.setState({ signature: undefined });
  };

  return { signature, promptSignature, resetSignature };
};

export default useSignature;
