import { Injectable, computed, signal } from '@angular/core';
import { pageSizes } from '../constants';
import { PageOptions } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PageOptionsService {
  private readonly pageOptions = signal({
    page: 0,
    size: pageSizes[0],
  });

  readonly page = computed(() => this.pageOptions().page);
  readonly size = computed(() => this.pageOptions().size);

  setPageOptions(options: PageOptions): void {
    this.pageOptions.set(options);
  }
}
