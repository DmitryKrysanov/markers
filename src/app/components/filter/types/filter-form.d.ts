import { FormControl } from '@angular/forms';

export type FilterForm = FromGroup<{
  range: FormGroup<{
    start: FormControl<Date>;
    end: FormControl<Date>;
  }>;
  isActive: FormControl<boolean>;
}>;