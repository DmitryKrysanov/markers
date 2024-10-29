import { MatIconModule } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent, MapComponent } from './components';
import { Filter, Group } from './types';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { isEqual } from 'lodash';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly initialFilter: Filter = {
    range: { start: null, end: null },
    isActive: true,
  };
  filter = signal<Filter>(this.initialFilter);
  isShowFilter = signal(false);
  isFilterExists = computed(() => isEqual(this.filter(), this.initialFilter));
  selectedGroup = signal<Group>(null);

  constructor() {
    effect(() => console.log(this.filter()));
    effect(() => console.log(this.selectedGroup()));
  }

  onFilterToggle(): void {
    this.isShowFilter.set(!this.isShowFilter());
  }
}
