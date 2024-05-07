import { useEffect } from 'react';
import type { Marker } from '../../types/map';

const Marker = ({ map, coordinates, icon, onClick }: Marker): null => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html */
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      }); 
    }

    if (onClick) { // 마커를 클릭했을 때 prop으로 전달한 onClick 함수가 실행 됨
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Marker;
