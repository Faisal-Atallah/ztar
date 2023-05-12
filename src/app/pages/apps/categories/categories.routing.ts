import { Route } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesResolver } from './categories.resolvers';

export const categoriesRoutes: Route[] = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: CategoriesResolver,
    },
  },
];
