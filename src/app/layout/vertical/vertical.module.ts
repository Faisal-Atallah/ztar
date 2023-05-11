import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalComponent } from './vertical.component';
import { RouterModule } from '@angular/router';
import { NavModule } from 'src/app/partials/nav';
import { HeaderModule } from 'src/app/partials/header';
import { MaterialModule } from 'src/app/shared/modules';
import { ContentModule } from 'src/app/partials/content';

@NgModule({
  declarations: [VerticalComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavModule,
    HeaderModule,
    ContentModule,
    MaterialModule,
  ],
  exports: [VerticalComponent],
})
export class VerticalModule {}
