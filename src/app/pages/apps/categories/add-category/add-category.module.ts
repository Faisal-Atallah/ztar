import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './add-category.component';
import { addCategoryRoutes } from './add-category.routing';
import { RouterModule } from '@angular/router';
import { MaterialModule, SharedModule } from 'src/app/shared/modules';

@NgModule({
  declarations: [AddCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(addCategoryRoutes),
  ],
})
export class AddCategoryModule {}
