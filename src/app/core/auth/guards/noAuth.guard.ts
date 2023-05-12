import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '..';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanMatch {
  /**
   * Constructor
   * @param {AuthService} _authService
   * @param {Router} _router
   */
  constructor(private _authService: AuthService, private _router: Router) {}

  /**
   * Can match
   *
   * @param {Route}route
   * @param {UrlSegment[]}segments
   *
   */
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._check();
  }

  /**
   * Check the authenticated status
   *
   * @private
   * @returns {Observable<boolean>}
   */
  private _check(): Observable<boolean> {
    // Check the authentication status and return an observable of
    // "true" or "false" to allow or prevent the access
    return this._authService
      .isAccessAllowed()
      .pipe(switchMap((authenticated) => of(!authenticated)));
  }
}
