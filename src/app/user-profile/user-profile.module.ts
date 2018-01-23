import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { userProfileRoutes } from './user-profile.routes';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UserProfileService } from 'app/user-profile/shared/services/user-profile.service';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,  /** This must be the first import for material design to work */
    RouterModule.forChild( userProfileRoutes ),
    SharedModule,
    AngularMaterialModule
  ],
  providers: [ UserProfileService ]
})
export class UserProfileModule {
  public static routes = userProfileRoutes;
}
