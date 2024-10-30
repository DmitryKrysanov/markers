import { DayData, Group, Member } from '../types';
import { faker } from '@faker-js/faker';

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

// function generateMockGroups(count: number): Group[] {
//   const groups: Group[] = [];

//   for (let i = 0; i < count; i++) {
//     groups.push({
//       name: faker.company.name(),
//       members: faker.number.int({ min: 1, max: 100 }),
//       date: faker.date.anytime(),
//       additionalInfo: faker.lorem.sentence({ min: 1, max: 4 }),
//       groupId: faker.number.int({ min: 1, max: 15 }),
//     });
//   }

//   return members;
// }

export const membersMock = generateMockMembers(3000);

export const dataMock: DayData[] = [
  {
    date: new Date(),
    groups: [
      {
        name: 'Group 1',
        coords: { lat: 50.100246, lng: 38.613887 },
        members: 50,
        id: 1,
      },
      {
        name: 'Group 2',
        coords: { lat: 50.097235, lng: 38.639195 },
        members: 100,
        id: 2,
      },
    ],
  },
];
