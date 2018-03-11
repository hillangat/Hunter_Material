import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ReceiverRegionsComponent } from './receiver-regions.component';
import { RouterModule } from '@angular/router';
import { receiverRegionRouters } from './receiver-regions.routes';
import { ReceiveRegionGridComponent } from './receive-region-grid/receive-region-grid.component';
import { ReceiverRegionService } from './services/receiver-region.service';
import { EditRegionComponent } from './shared/edit-region/edit-region.component';

@NgModule({
    imports: [
        CommonModule,  /** This must be the first import for material design to work */
        RouterModule.forChild( receiverRegionRouters ),
        SharedModule
    ],
    declarations: [
        ReceiverRegionsComponent,
        ReceiveRegionGridComponent,
        EditRegionComponent
    ],
    exports: [
        ReceiverRegionsComponent,
    ],
    providers: [ ReceiverRegionService ],
    entryComponents: [ EditRegionComponent ]
})
export class ReceiverRegionsModule {
    public static receiveRoutes: Routes = receiverRegionRouters;
}
