import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/core/auth';
import { CATEGORIES_ROUTE_PATH_WITH_SLASH } from 'src/app/pages/apps/categories';
import { HOME_ROUTE_PATH_WITH_SLASH } from 'src/app/pages/landing/home';
import { NavItem } from 'src/app/shared/types';

@Component({
  selector: 'app-layout-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalComponent {
  navItems: NavItem[] = [
    { id: '1', title: 'Home', link: HOME_ROUTE_PATH_WITH_SLASH, icon: 'home' },
    { id: '2', title: 'Books', link: '', icon: 'library_books' },
    {
      id: '3',
      title: 'Categories',
      link: CATEGORIES_ROUTE_PATH_WITH_SLASH,
      icon: 'dashboard',
    },
  ];

  /**
   * Constructor
   * @param {AuthService}_authService
   */
  constructor(private _authService: AuthService) {}

  /**
   * Sign Out
   * @returns {void}
   */
  signOut(): void {
    this._authService.signOut();
  }
}
