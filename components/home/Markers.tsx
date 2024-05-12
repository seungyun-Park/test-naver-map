import React from 'react';
import useSWR from 'swr';
import { MAP_KEY } from '../../hooks/useMap';
import { STORE_KEY } from '../../hooks/useStores';
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from '../../hooks/useCurrentStore';
import type { NaverMap } from '../../types/map';
import type { Store } from '../../types/store';
import Marker from './Marker';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates} // 위경도
            icon='images/markers.png'
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.nid}
          />
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon='images/markers-selected.png'
          onClick={clearCurrentStore}
          key={currentStore.nid}
        />
      )}
    </>
  );
};
export default Markers;
