import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { categoriesRoutes } from './categories.routing';
import { MaterialModule } from 'src/app/shared/modules';
import { CategoriesListModule } from './list/list.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(categoriesRoutes),
    CategoriesListModule,
  ],
})
export class CategoriesModule {}
