import { LoggerService } from 'app/shared/logger/logger-service';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogTemplateComponent } from './sample-codes/dialog-template/dialog-template.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { appRoutes } from './app.routes';
import { TaskModule } from 'app/task/task.module';
import { SecureRouteGuard } from './shared/route-guards.ts/secure-route-guard';
import { HomeModule } from 'app/home/home.module';
import { MaterialCodeComponent } from './material-code/material-code/material-code.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogTemplateComponent,
    MaterialCodeComponent
  ],
  imports: [
    BrowserModule, /** BrowserModule must be the first import for material design to work */
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    TaskModule,
    HomeModule,
    AdminModule,
    RouterModule.forRoot( appRoutes )
  ],
  exports: [
  ],
  providers: [ ChildrenOutletContexts, SecureRouteGuard, LoggerService ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogTemplateComponent
  ]
})
export class AppModule {
  public static routes: Routes = appRoutes;
 }
