import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { MaterialModule, SharedModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';
import { authSignUpRoutes } from './sign-up.routing';
import { ImageHolderModule } from 'src/app/widget/image-holder';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(authSignUpRoutes),
    ImageHolderModule,
    MaterialModule,
  ],
})
export class SignUpModule {}
