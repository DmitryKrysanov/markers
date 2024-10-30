import { MatIconModule } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { isEqual } from 'lodash';
import { GroupsService } from '../../../services';
import { Filter, Group } from '../../../types';
import { FilterComponent } from '../../filter';
import { GroupDetailsComponent } from '../../group-details/group-details.component';
import { MapComponent } from '../../map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FilterComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MapComponent,
    GroupDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private groupsService = inject(GroupsService);

  private readonly initialFilter: Filter = {
    range: { start: new Date(), end: new Date() },
    showOnlyActive: false,
  };
  filter = signal<Filter>(this.initialFilter);
  isShowFilter = signal(false);
  isFilterExists = computed(() => isEqual(this.filter(), this.initialFilter));
  selectedGroup = signal<Group>(null);

  constructor() {
    effect(() => this.groupsService.getGroupsByFilter(this.filter()), {
      allowSignalWrites: true,
    });
  }

  onFilterToggle(): void {
    this.isShowFilter.set(!this.isShowFilter());
  }

  onCloseGroupDetails(): void {
    this.selectedGroup.set(null);
  }
}
