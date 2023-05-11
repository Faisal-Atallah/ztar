import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NavItem } from 'src/app/shared/types';

@Component({
  selector: 'app-widget-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavItemComponent {
  @Input() item: NavItem;
}
