import { FormControl } from '@angular/forms';

export interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>;
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  confirm_password: FormControl<string>;
}
