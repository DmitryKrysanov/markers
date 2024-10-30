import { computed, Injectable, signal } from '@angular/core';
import { membersMock } from '../constants';
import { Member } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private membersMock = signal<Member[]>(membersMock);
  members = signal<Member[]>(null);
  totalMembersAmount = computed(() => this.members()?.length ?? 0);

  getMembersByGroupId(groupId: number) {
    const members = this.membersMock().filter(
      (member: Member) => member.groupId === groupId
    );
    this.members.set(members);
  }
}
