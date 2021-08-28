import create from 'zustand';

type StoreState = {
  signature?: string;
};

export const useStore = create<StoreState>(() => ({
  signature: undefined
}));
