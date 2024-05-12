import type { Coordinates } from './store';

export type NaverMap = naver.maps.Map;

export type Marker = {
  map: NaverMap;
  coordinates: Coordinates;
  icon: string;
  onClick?: () => void;
};