import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './list.component';
import { MaterialModule, SharedModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from 'src/app/widget/page-header';

@NgModule({
  declarations: [BooksListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    PageHeaderModule,
  ],
  exports: [BooksListComponent],
})
export class BooksListModule {}
