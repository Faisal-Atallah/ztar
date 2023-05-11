import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './nav-item.component';
import { MaterialModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavItemComponent],
  imports: [CommonModule, MaterialModule,RouterModule],
  exports: [NavItemComponent],
})
export class NavItemModule {}
