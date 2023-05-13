import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { SIGN_IN_ROUTE_PATH } from 'src/app/pages/auth/sign-in';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  /**
   * Constructor
   * @param {AuthService}_authService
   * @param {Router}_router
   */
  constructor(private _authService: AuthService, private _router: Router) {}

  /**
   * Can match
   *
   * @param {Route}route
   * @param {UrlSegment[]}segments
   */
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._check(segments);
  }

  /**
   * Check the authenticated status
   *
   * @param {UrlSegment[]}segments
   * @private
   * @returns {Observable<boolean | UrlTree>}
   */
  private _check(segments: UrlSegment[]): Observable<boolean | UrlTree> {
    // Check the authentication status
    return this._authService.isAccessAllowed().pipe(
      switchMap((authenticated) => {
        // If the user is not authenticated...
        if (!authenticated) {
          // Redirect to the sign-in page with a redirectUrl param
          const redirectURL = `/${segments.join('/')}`;
          const urlTree = this._router.parseUrl(
            `${SIGN_IN_ROUTE_PATH}?redirectURL=${redirectURL}`
          );
          return of(urlTree);
        }
        // Allow the access
        return of(true);
      })
    );
  }
}
