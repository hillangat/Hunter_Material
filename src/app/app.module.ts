import { DynGridService } from './shared/dynamic-grid/services/dyn-grid.service/dyn-grid.service';
import { LoggerService } from 'app/shared/logger/logger-service';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
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
import { DynGridConfirmComponent } from 'app/shared/dynamic-grid/dyn-grid-confirm/dyn-grid-confirm.component';
import { HunterProgressSpinnerComponent } from './shared/hunter-progress-spinner/hunter-progress-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogTemplateComponent,
    MaterialCodeComponent,
    DynGridConfirmComponent,
    HunterProgressSpinnerComponent
  ],
  imports: [
    BrowserModule, /** BrowserModule must be the first import for material design to work */
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    TaskModule,
    HomeModule,
    AdminModule,
    RouterModule.forRoot( appRoutes )
  ],
  exports: [],
  providers: [
    ChildrenOutletContexts,
    SecureRouteGuard,
    LoggerService,
    DynGridService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogTemplateComponent
  ]
})
export class AppModule {
  public static routes: Routes = appRoutes;
 }
