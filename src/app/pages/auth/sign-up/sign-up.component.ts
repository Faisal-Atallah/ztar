import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';
import { MustMatch } from 'src/app/core/helpers/validations/must-match';
import { StrongValidator } from 'src/app/core/helpers/validations/strong-validation';
import { SIGN_IN_ROUTE_PATH } from '../sign-in';
import { SignUpForm } from './sign-up.form.types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup<SignUpForm>;

  /**
   * Constructor
   * @param {FormBuilder}_formBuilder
   * @param {Router}_router
   * @param {AuthService}_authService
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._createSignUpForm();
  }

  /**
   * Sign Up
   * @returns {void}
   */
  signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.signUpForm.disable();

    const email: string = this.signUpForm.get('email')?.value as string;
    const password: string = this.signUpForm.get('password')?.value as string;

    this._authService.signUp(email, password).then(() => {
      this.signUpForm.enable();

      this.signUpNgForm.resetForm();

      this._router.navigate([`/${SIGN_IN_ROUTE_PATH}`]);
    });
  }

  /**
   * Create Sign Up Form
   * @private
   * @returns {void}
   */
  private _createSignUpForm(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group(
      {
        first_name: ['', Validators.required],
        last_name: [''],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            StrongValidator.strong,
          ]),
        ],
        confirm_password: ['', Validators.compose([Validators.required])],
      },
      {
        validator: MustMatch('password', 'confirm_password'),
      }
    );
  }
}
