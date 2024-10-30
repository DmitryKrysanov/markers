import { Injectable } from '@angular/core';
import { Filter } from '../../../types';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterForm } from '../types';
import { initialFilter } from '../../../constants';

@Injectable()
export class FilterFormService {
  initForm(filter: Filter): FilterForm {
    return new FormGroup<FilterForm>({
      range: new FormGroup({
        start: new FormControl<Date>(filter?.range.start ?? new Date()),
        end: new FormControl<Date>(filter?.range.end ?? new Date()),
      }),
      showOnlyActive: new FormControl<boolean>(filter?.showOnlyActive ?? false),
    });
  }

  resetForm(form: FormGroup): void {
    form.patchValue(initialFilter);
  }
}
