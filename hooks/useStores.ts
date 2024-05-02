import { useCallback } from 'react';
import { Store } from '../types/store';
import { mutate } from 'swr';

export const STORE_KEY = '/stores';

const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    mutate(STORE_KEY, stores);
  }, []); // 새로운 매장 데이터를 인자로 받아, 그 데이터를 전역 상태로 저장

  return {
    initializeStores,
  };
};
export default useStores;
