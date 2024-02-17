import { useContext } from 'react';
import { useStore } from 'zustand';
import { StoreContext } from '../context/workflow-context';

type BearState = {
  bears: number;
  increase: (by: number) => void;
};

function useActionStore(selector: (state: BearState) => void) {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useActionStore must be used within a StoreProvider.');
  }
  return useStore(store, selector);
}

export default useActionStore;
