import { Injectable } from '@angular/core';
import { Filter } from '../../../types';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterForm } from '../types';

@Injectable()
export class FilterFormService {
  initForm(filter: Filter): FilterForm {
    return new FormGroup<FilterForm>({
      range: new FormGroup({
        start: new FormControl<Date>(filter?.range.start ?? null),
        end: new FormControl<Date>(filter?.range.end ?? null),
      }),
      showOnlyActive: new FormControl<boolean>(filter?.showOnlyActive ?? false),
    });
  }

  resetForm(form: FilterForm): void {
    form.reset();
  }
}
