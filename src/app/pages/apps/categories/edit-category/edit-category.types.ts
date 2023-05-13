import { FormControl } from '@angular/forms';

export interface EditCategoryForm {
  id: FormControl<string>;
  name: FormControl<string>;
  books: any;
}
