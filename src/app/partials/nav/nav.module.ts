import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { NavItemModule } from 'src/app/widget/nav-item';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, NavItemModule],
  exports: [NavComponent],
})
export class NavModule {}
