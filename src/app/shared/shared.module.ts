import { ProgSpinnerComponent } from './prog-spinner/prog-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from 'app/shared/page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DynamicGridComponent } from 'app/shared/dynamic-grid/dynamic-grid.component';
import { CardTitleHeaderComponent } from 'app/shared/card-title-header/card-title-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProgSpinnerComponent,
    PageNotFoundComponent,
    DynamicGridComponent,
    CardTitleHeaderComponent
  ],
  exports: [
    ProgSpinnerComponent,
    PageNotFoundComponent,
    FormsModule,
    AngularMaterialModule,
    DynamicGridComponent,
    CardTitleHeaderComponent,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule { }
