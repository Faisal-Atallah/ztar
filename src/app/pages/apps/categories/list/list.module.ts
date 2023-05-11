import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './list.component';
import { MaterialModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoriesListComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [CategoriesListComponent],
})
export class CategoriesListModule {}
