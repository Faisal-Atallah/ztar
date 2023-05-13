import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/auth';
import { MustMatch } from 'src/app/core/helpers/validations/must-match';
import { StrongValidator } from 'src/app/core/helpers/validations/strong-validation';
import { MaterialModule } from 'src/app/shared/modules';
import { ImageHolderModule } from 'src/app/widget/image-holder';
import { environment } from 'src/environments/environment';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        ImageHolderModule,
        MaterialModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [SignUpComponent],
      providers: [AuthService, AngularFireAuth, AngularFirestore],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    let passwordControl: FormControl;
    let confirmPasswordControl: FormControl;

    beforeEach(() => {
      passwordControl = component.signUpForm.controls[
        'password'
      ] as FormControl;
      confirmPasswordControl = component.signUpForm.controls[
        'confirm_password'
      ] as FormControl;
    });

    it('should validate required fields', () => {
      const firstNameControl = component.signUpForm.get('first_name');
      const emailControl = component.signUpForm.get('email');
      const passwordControl = component.signUpForm.get('password');
      const confirmPasswordControl =
        component.signUpForm.get('confirm_password');
      expect(firstNameControl?.valid).toBeFalse();
      expect(emailControl?.valid).toBeFalse();
      expect(passwordControl?.valid).toBeFalse();
      expect(confirmPasswordControl?.valid).toBeFalse();
      expect(component.signUpForm.valid).toBeFalse();

      firstNameControl?.setValue('Faisal');
      emailControl?.setValue('faisal.attallah@hotmail.com');
      passwordControl?.setValue('Password12$');
      confirmPasswordControl?.setValue('Password12$');

      expect(firstNameControl?.valid).toBeTrue();
      expect(emailControl?.valid).toBeTrue();
      expect(passwordControl?.valid).toBeTrue();
      expect(confirmPasswordControl?.valid).toBeTrue();
      expect(component.signUpForm.valid).toBeTrue();
    });

    it('should validate the email', () => {
      const emailControl = component.signUpForm.controls['email'];
      expect(emailControl.valid).toBeFalse();

      emailControl.setValue('invalid-email');
      expect(emailControl.valid).toBeFalse();

      emailControl.setValue('faisal.attallah@hotmail.com');
      expect(emailControl.valid).toBeTrue();
    });

    it('should validate the password strength', () => {
      passwordControl?.setValue('password');
      expect(passwordControl?.valid).toBeFalse();

      passwordControl?.setValue('password1234');
      expect(passwordControl?.valid).toBeFalse();

      passwordControl?.setValue('P@ssword1234$');
      expect(passwordControl?.valid).toBeTrue();
    });

    it('should validate the password confirmation', () => {
      passwordControl?.setValue('P@ssword1234$');
      confirmPasswordControl?.setValue('P@ssword1234$');
      expect(component.signUpForm.valid).toBeFalse();

      confirmPasswordControl?.setValue('invalidpassword');
      expect(component.signUpForm.valid).toBeFalse();
    });

    it('should be invalid if the confirm password does not match the password', () => {
      const passwordControl = component.signUpForm.get('password');
      const confirmPasswordControl =
        component.signUpForm.get('confirm_password');
      passwordControl?.setValue('abcd1234$');
      confirmPasswordControl?.setValue('abcd123$');
      expect(component.signUpForm.valid).toBeFalse();
    });

    it('should be valid if the confirm password matches the password', () => {
      passwordControl.setValue('A@bcd1234$');
      confirmPasswordControl.setValue('A@bcd1234$');
      expect(component.signUpForm.valid).toBeFalse();
    });
  });

  describe('Form Submission', () => {
    it('should not submit the form when the fields are invalid', () => {
      component.signUpForm.controls['first_name'].setValue('');
      component.signUpForm.controls['email'].setValue('invalid-email');
      component.signUpForm.controls['password'].setValue('weak');
      component.signUpForm.controls['confirm_password'].setValue('');

      expect(component.signUpForm.valid).toBeFalse();
      expect(component.signUp()).toBeUndefined();
    });

    it('should submit the form when the fields are valid', () => {
      component.signUpForm.controls['first_name'].setValue('Faisal');
      component.signUpForm.controls['last_name'].setValue('Attallah');
      component.signUpForm.controls['email'].setValue(
        'faisal.attallah@hotmail.com'
      );
      component.signUpForm.controls['password'].setValue('Strong@Password123$');
      component.signUpForm.controls['confirm_password'].setValue(
        'Strong@Password123$'
      );

      expect(component.signUpForm?.valid).toBeTrue();
      expect(component.signUp()).toBeUndefined();
    });
  });
});
