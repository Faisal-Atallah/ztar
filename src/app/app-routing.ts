import { Route } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './core/auth/guards';
import { LayoutComponent } from './layout/layout.component';
import { BOOKS_ROUTE_PATH } from './pages/apps/books';
import { CATEGORIES_ROUTE_PATH } from './pages/apps/categories';
import { ADD_CATEGORY_ROUTE_PATH } from './pages/apps/categories/add-category/add-category.constants';
import { EDIT_CATEGORY_ROUTE_PATH } from './pages/apps/categories/edit-category';
import { SIGN_IN_ROUTE_PATH } from './pages/auth/sign-in/sign-in.constants';
import { SIGN_UP_ROUTE_PATH } from './pages/auth/sign-up';
import { ERROR_ROUTE_PATH } from './pages/error/error-500/error-500.constants';
import { HOME_ROUTE_PATH } from './pages/landing/home/home.constants';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: SIGN_IN_ROUTE_PATH,
    pathMatch: 'full',
  },
  {
    path: HOME_ROUTE_PATH,
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'vertical',
    },
    loadChildren: () =>
      import('../app/pages/landing/home').then((m) => m.HomeModule),
  },
  {
    path: SIGN_IN_ROUTE_PATH,
    canMatch: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    loadChildren: () =>
      import('../app/pages/auth/sign-in').then((m) => m.SignInModule),
  },
  {
    path: SIGN_UP_ROUTE_PATH,
    canMatch: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    loadChildren: () =>
      import('../app/pages/auth/sign-up').then((m) => m.SignUpModule),
  },
  {
    path: CATEGORIES_ROUTE_PATH,
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: { layout: 'vertical' },
    loadChildren: () =>
      import('../app/pages/apps/categories').then((m) => m.CategoriesModule),
  },
  {
    path: ADD_CATEGORY_ROUTE_PATH,
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: { layout: 'vertical' },
    loadChildren: () =>
      import('../app/pages/apps/categories/add-category').then(
        (m) => m.AddCategoryModule
      ),
  },
  {
    path: EDIT_CATEGORY_ROUTE_PATH,
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'vertical',
    },
    loadChildren: () =>
      import('../app/pages/apps/categories/edit-category').then(
        (m) => m.EditCategoryModule
      ),
  },
  {
    path: BOOKS_ROUTE_PATH,
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'vertical',
    },
    loadChildren: () =>
      import('../app/pages/apps/books').then((m) => m.BooksModule),
  },
  {
    path: ERROR_ROUTE_PATH,
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    loadChildren: () =>
      import('../app/pages/error/error-500').then((m) => m.Error500Module),
  },

  { path: '**', redirectTo: SIGN_IN_ROUTE_PATH, canMatch: [NoAuthGuard] },
  { path: '**', redirectTo: HOME_ROUTE_PATH, canMatch: [AuthGuard] },
];
