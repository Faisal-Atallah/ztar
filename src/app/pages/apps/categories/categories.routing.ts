import { Route } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesResolver } from './categories.resolvers';
import { EditCategoryComponent } from './edit-category';

export const categoriesRoutes: Route[] = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: CategoriesResolver,
    }
  },
];
