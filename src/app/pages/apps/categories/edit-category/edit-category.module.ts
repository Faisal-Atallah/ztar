import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './edit-category.component';
import { RouterModule } from '@angular/router';
import { editCategoryRoutes } from './edit-category.routing';
import { MaterialModule, SharedModule } from 'src/app/shared/modules';
@NgModule({
  declarations: [EditCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(editCategoryRoutes),
  ],
})
export class EditCategoryModule {}
