import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { homeRoutes } from './home.routes';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HomeService } from 'app/home/shared/services/home-service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,  /** This must be the first import for material design to work */
    RouterModule.forChild( homeRoutes ),
    SharedModule,
    AngularMaterialModule
  ],
  providers: [ HomeService ]
})
export class HomeModule {
  public static routes = homeRoutes;
}
