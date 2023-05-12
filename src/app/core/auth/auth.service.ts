import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SIGN_IN_ROUTE_PATH_WITH_SLASH } from 'src/app/pages/auth/sign-in';
import { HOME_ROUTE_PATH_WITH_SLASH } from 'src/app/pages/landing/home';
import { StorageService } from '../helpers/storage';
import { User, USER_AUTH } from '../user';
import { navigate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;

  /**
   * Constructor
   * @param {AngularFireAuth}_angularFireAuth
   * @param {AngularFirestore}_angularFirestore
   * @param {Router}_router
   * @param {StorageService}_storageService
   */
  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore,
    private _router: Router,
    private _storageService: StorageService
  ) {
    this._isUserAuthenticated();
  }

  /**
   * Sign In
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  signIn(email: string, password: string): Promise<any> {
    return this._angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this._setUserData(result.user);
        this._angularFireAuth.authState.subscribe((user) => {
          if (user) {
            navigate(HOME_ROUTE_PATH_WITH_SLASH, this._router);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   * Sign Up
   * @param {string}email
   * @param {string}password
   * @returns {Promise<any>}
   */
  signUp(email: string, password: string): Promise<any> {
    return this._angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this._setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   * Sign Out
   * @returns {void}
   */
  signOut(): void {
    this._angularFireAuth.signOut().then(() => {
      this._storageService.removeData(USER_AUTH);
      this._navigateToSignIn();
    });
  }

  /**
   * Is Access Allowed
   * @returns {Observable<boolean>}
   */
  isAccessAllowed(): Observable<boolean> {
    return this._storageService.getData(USER_AUTH) !== 'null' &&
      this._storageService.isStorageItemExistent(USER_AUTH)
      ? of(true)
      : of(false);
  }

  /**
   * Set User Data
   * @param user
   * @returns {User}
   * @private
   */
  private _setUserData(user: any): User {
    const userRef: AngularFirestoreDocument<any> = this._angularFirestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  /**
   * Is User Authenticated
   * @private
   * @returns {void}
   */
  private _isUserAuthenticated(): void {
    this._angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this._storageService.saveData(USER_AUTH, this.user);
      } else {
        this._storageService.saveData(USER_AUTH, 'null');
      }
    });
  }

  /**
   * Navigate To Sign In
   * @private
   * @returns {void}
   */
  private _navigateToSignIn(): void {
    setTimeout(() => {
      navigate(SIGN_IN_ROUTE_PATH_WITH_SLASH, this._router);
    }, 500);
  }
}
