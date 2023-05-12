import { Route } from '@angular/router';
import { CategoriesResolver } from '../categories';
import { BooksComponent } from './books.component';
import { BooksResolver } from './books.resolvers';
import { BooksListComponent } from './list/list.component';

export const booksRoutes: Route[] = [
  {
    path: '',
    component: BooksComponent,
    resolve: {},
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BooksListComponent,
        resolve: {
          categories: CategoriesResolver,
          books: BooksResolver,
        },
      },
    ],
  },
];
