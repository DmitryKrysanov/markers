import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  model,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Filter } from '../../../types';
import { FilterFormService } from '../services';
import { FilterForm } from '../types';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter(), FilterFormService],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private filterFormService = inject(FilterFormService);

  closeChanges = output<void>();
  filter = model<Filter>();

  form: FilterForm;
  maxDate = new Date();

  ngOnInit(): void {
    this.form = this.filterFormService.initForm(this.filter());
    this.listenFrom();
  }

  onResetFilter(): void {
    this.filterFormService.resetForm(this.form);
  }

  onClose(): void {
    this.closeChanges.emit();
  }

  private listenFrom(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: Filter) => {
        if (value.range.start && value.range.end) {
          this.filter.set(value);
        }
      });
  }
}
