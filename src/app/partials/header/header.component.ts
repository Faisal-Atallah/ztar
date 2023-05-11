import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-partials-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  open:boolean
}
