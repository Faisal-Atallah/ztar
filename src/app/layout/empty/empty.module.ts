import { NgModule } from '@angular/core';
import { EmptyLayoutComponent } from './empty.component';
import { SharedModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EmptyLayoutComponent],
  imports: [SharedModule, RouterModule],
  exports: [EmptyLayoutComponent],
})
export class EmptyLayoutModule {}
