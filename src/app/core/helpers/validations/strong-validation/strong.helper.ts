import { FormControl } from '@angular/forms';
import { ValidationResult } from './strong-validation.types';

export class StrongValidator {
  public static strong(control: FormControl): ValidationResult | null {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    let hasCharacter = /[^+-’=]+/.test(control.value);

    const valid = hasNumber && hasUpper && hasLower && hasCharacter;
    if (!valid) {
      return { strong: true };
    }
    return null;
  }
}
