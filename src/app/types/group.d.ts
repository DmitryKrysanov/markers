import { Member } from './index';

export type Group = {
  name: string;
  coords: google.maps.LatLngLiteral;
  members: Member[];
};
