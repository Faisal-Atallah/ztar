import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './list.component';
import { MaterialModule, SharedModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BooksListComponent],
  imports: [CommonModule, MaterialModule, SharedModule, RouterModule],
  exports: [BooksListComponent],
})
export class BooksListModule {}
