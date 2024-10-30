import { Injectable, signal } from '@angular/core';
import { groupsMock } from '../constants/data-mock';
import { Filter, Group } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private groupsMock = signal<Group[]>(groupsMock);
  groups = signal<Group[]>(null);

  getGroupsByFilter(filter: Filter) {
    const activeGroups = this.groupsMock().filter((group: Group) =>
      filter.showOnlyActive ? group.isActive : true
    );

    this.groups.set(activeGroups);
  }
}
