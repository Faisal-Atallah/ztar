import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignInComponent } from './sign-in.component';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ImageHolderModule } from 'src/app/widget/image-holder';
import { MaterialModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;

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
      declarations: [SignInComponent],
      providers: [AuthService, AngularFireAuth, AngularFirestore],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with email and password fields', () => {
    expect(component.signInForm.contains('email')).toBeTrue();
    expect(component.signInForm.contains('password')).toBeTrue();
  });

  it('should make the email field required', () => {
    const emailControl = component.signInForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
  });

  it('should make the email field require a valid email', () => {
    const emailControl = component.signInForm.get('email');
    emailControl?.setValue('invalidemail');
    expect(emailControl?.valid).toBeFalsy();
  });

  it('should make the password field required', () => {
    const passwordControl = component.signInForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('should submit the form when valid', () => {
    spyOn(component, 'signIn');
    const emailControl = component.signInForm.get('email');
    const passwordControl = component.signInForm.get('password');
    emailControl?.setValue('faisal.attallah@hotmail.com');
    passwordControl?.setValue('password');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.signIn).toHaveBeenCalled();
  });
});
