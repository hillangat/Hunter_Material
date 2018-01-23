import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from 'app/shared/page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DynamicGridComponent } from 'app/shared/dynamic-grid/dynamic-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  declarations: [
    PageNotFoundComponent,
    DynamicGridComponent
  ],
  exports: [
    PageNotFoundComponent,
    FormsModule,
    AngularMaterialModule,
    DynamicGridComponent
  ],
  providers: []
})
export class SharedModule { }
