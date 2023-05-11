import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { landingHomeRoutes } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(landingHomeRoutes)],
})
export class HomeModule {}
