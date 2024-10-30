import { Filter } from '../types';

export const initialFilter: Filter = {
  range: { start: new Date(), end: new Date() },
  showOnlyActive: false,
};
