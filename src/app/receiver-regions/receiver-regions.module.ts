import { Routes } from '@angular/router';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ReceiverRegionsComponent } from './receiver-regions.component';
import { RouterModule } from '@angular/router';
import { receiverRegionRouters } from './receiver-regions.routes';

@NgModule({
    imports: [
        RouterModule.forChild( receiverRegionRouters ),
    ],
    declarations: [
        ReceiverRegionsComponent,
    ],
    exports: [
        ReceiverRegionsComponent,
    ]
})
export class ReceiverRegionsModule {
    public static receiveRoutes: Routes = receiverRegionRouters;
}
