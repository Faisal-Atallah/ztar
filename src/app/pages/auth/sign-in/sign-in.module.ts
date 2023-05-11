import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';
import { authSignInRoutes } from './sign-in.routing';
import { MaterialModule, SharedModule } from 'src/app/shared/modules';
import { ImageHolderModule } from 'src/app/widget/image-holder';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(authSignInRoutes),
    ImageHolderModule,
    MaterialModule
  ],
})
export class SignInModule {}
