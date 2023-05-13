import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth';
import { SignInForm } from './sign-in.form.types';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  signInForm: FormGroup<SignInForm>;

  /**
   * Constructor
   * @param {FormBuilder}_formBuilder
   * @param {AuthService}_authService
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._createSignInForm();
  }

  /**
   * Sign In
   * @returns {void}
   */
  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    const email: string = this.signInForm.get('email')?.value as string;
    const password: string = this.signInForm.get('password')?.value as string;

    this._authService.signIn(email, password).then(() => {
      this.signInForm.enable();

      this.signInNgForm.resetForm();
    });
  }

  /**
   * Create Sign In Form
   * @private
   * @returns {void}
   */
  private _createSignInForm(): void {
    this.signInForm = this._formBuilder.nonNullable.group({
      email: [
        'faisal.attallah@hotmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['12345678Faisal$', Validators.required],
    });
  }
}
