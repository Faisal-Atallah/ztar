import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './details.component';
import { MaterialModule } from 'src/app/shared/modules';

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [CommonModule, MaterialModule],
})
export class BookDetailsModule {}
