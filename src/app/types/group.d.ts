import { Member } from './index';

export type Group = {
  name: string;
  location: {
    date: Date;
    coords: google.maps.LatLngLiteral;
  }[];
  id: number;
  isActive: boolean;
};
