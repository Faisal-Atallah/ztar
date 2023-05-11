import { Component, Input, ViewEncapsulation } from '@angular/core';
import { trackByFn } from 'src/app/core/utils';
import { NavItem } from 'src/app/shared/types';

@Component({
  selector: 'app-partials-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  @Input() navItems: NavItem[];

  /**
   * Track ByFn
   * @param {number}index
   * @param {string}id
   * @returns {string}
   */
  trackByFn(index: number, id: string): string {
    return trackByFn(index, id);
  }
}
