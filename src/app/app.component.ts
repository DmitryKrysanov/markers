import { MatIconModule } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './components';
import { Filter } from './types';
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

  constructor() {
    effect(() => console.log(this.filter()));
  }

  onFilterToggle(): void {
    this.isShowFilter.set(!this.isShowFilter());
  }
}
