import { DayData } from '../types';

export const dataMock: DayData[] = [
  {
    date: new Date(),
    groups: [
      {
        name: 'Group 1',
        coords: { lat: 50.100246, lng: 38.613887 },
        members: [
          {
            name: 'Member1',
            rank: '1',
            number: 1,
            date: new Date(),
            additionalInfo: 'info',
          },
        ],
      },
      {
        name: 'Group 2',
        coords: { lat: 50.097235, lng: 38.639195 },
        members: [
          {
            name: 'Member2',
            rank: '1',
            number: 3,
            date: new Date(),
            additionalInfo: 'info',
          },
        ],
      },
    ],
  },
];
