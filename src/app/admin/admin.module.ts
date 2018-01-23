import { AdminService } from './shared/services/admin.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { adminRoutes } from './admin.routes';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,  /** This must be the first import for material design to work */
    RouterModule.forChild( adminRoutes ),
    SharedModule,
    AngularMaterialModule
  ],
  providers: [ AdminService ]
})
export class AdminModule {
  public static routes = adminRoutes;
}
