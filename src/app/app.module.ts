import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './shared/services/alert.service';
import { AlertComponent } from './shared/alert/alert.component';
import { SharedModule } from './shared/shared.module';
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
import { ConfirmGridActionComponent } from './shared/confirm-grid-action/confirm-grid-action.component';
import { OverlayComponent } from './shared/overlay/overlay.component';
import { OverlayService } from './shared/overlay/shared/overlay.service';


@NgModule({
  declarations: [
    AppComponent,
    DialogTemplateComponent,
    MaterialCodeComponent,
    DynGridConfirmComponent,
    ConfirmGridActionComponent,
    AlertComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule, /** BrowserModule must be the first import for material design to work */
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TaskModule,
    HomeModule,
    AdminModule,
    SharedModule,
    RouterModule.forRoot( appRoutes )
  ],
  exports: [ ReactiveFormsModule ],
  providers: [
    ChildrenOutletContexts,
    SecureRouteGuard,
    LoggerService,
    DynGridService,
    AlertService,
    FormBuilder,
    OverlayService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogTemplateComponent,
    DynGridConfirmComponent,
    ConfirmGridActionComponent
  ]
})
export class AppModule {
  public static routes: Routes = appRoutes;
 }
