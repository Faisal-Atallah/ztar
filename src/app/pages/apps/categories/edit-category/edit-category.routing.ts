import { Route } from '@angular/router';
import { EditCategoryComponent } from './edit-category.component';
import { EditCategoryResolver } from './edit-category.resolvers';

export const editCategoryRoutes: Route[] = [
  {
    path: ':id',
    component: EditCategoryComponent,
    resolve:{
      category:EditCategoryResolver
    }
  },
];
