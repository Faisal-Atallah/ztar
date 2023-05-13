import { Route } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesResolver } from './categories.resolver';

export const categoriesRoutes: Route[] = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: CategoriesResolver,
    },
  },
];
