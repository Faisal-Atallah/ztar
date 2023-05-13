import { Route } from '@angular/router';
import { BooksResolver } from '../../apps/books';
import { CategoriesResolver } from '../../apps/categories';
import { HomeComponent } from './home.component';

export const landingHomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      books: BooksResolver,
      categories: CategoriesResolver,
    },
  },
];
