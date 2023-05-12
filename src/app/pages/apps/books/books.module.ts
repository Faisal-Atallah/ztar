import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule } from '@angular/router';
import { booksRoutes } from './books.routing';
import { BooksListModule } from './list';

@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, RouterModule.forChild(booksRoutes), BooksListModule],
})
export class BooksModule {}
