import { createContext, useRef } from 'react';
import { createStore, StoreApi } from 'zustand';

type BearState = {
  bears: number;
  increase: (by: number) => void;
};

export const StoreContext = createContext<StoreApi<BearState> | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<BearState> | null>();
  if (!storeRef.current) {
    storeRef.current = createStore<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }));
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};
