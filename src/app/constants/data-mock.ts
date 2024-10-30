import { Group, Member } from '../types';
import { faker } from '@faker-js/faker';
import { addDays } from 'date-fns';

function generateMockMembers(count: number): Member[] {
  const members: Member[] = [];

  for (let i = 0; i < count; i++) {
    members.push({
      name: faker.person.fullName(),
      number: faker.number.int({ min: 1, max: 100 }),
      date: faker.date.anytime(),
      additionalInfo: faker.lorem.sentence({ min: 1, max: 4 }),
      groupId: faker.number.int({ min: 1, max: 15 }),
    });
  }

  return members;
}

export const membersMock = generateMockMembers(3000);

export const groupsMock: Group[] = [
  {
    name: 'Group 1',
    location: [
      {
        date: new Date(),
        coords: { lat: 49.949397, lng: 39.004555 },
      },
      {
        date: addDays(new Date(), -1),
        coords: { lat: 49.941665, lng: 38.992367 },
      },
      {
        date: addDays(new Date(), -2),
        coords: { lat: 49.921112, lng: 38.960267 },
      },
    ],
    isActive: true,
    id: 1,
  },
  {
    name: 'Group 2',
    location: [
      {
        date: new Date(),
        coords: { lat: 49.924886, lng: 39.048601 },
      },
      {
        date: addDays(new Date(), -1),
        coords: { lat: 49.909506, lng: 39.01949 },
      },
      {
        date: addDays(new Date(), -2),
        coords: { lat: 49.888386, lng: 38.988762 },
      },
    ],
    isActive: true,
    id: 2,
  },
  {
    name: 'Group 3',
    location: [
      {
        date: new Date(),
        coords: { lat: 49.868044, lng: 39.125658 },
      },
      {
        date: addDays(new Date(), -1),
        coords: { lat: 49.856468, lng: 39.08249 },
      },
      {
        date: addDays(new Date(), -2),
        coords: { lat: 49.832779, lng: 38.989106 },
      },
    ],
    isActive: false,
    id: 3,
  },
];
