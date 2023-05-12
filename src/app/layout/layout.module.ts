import { NgModule } from '@angular/core';
import { EmptyLayoutModule } from './empty';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/modules';
import { VerticalModule } from './vertical';

const layoutModules = [EmptyLayoutModule, VerticalModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [SharedModule, EmptyLayoutModule, VerticalModule],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
