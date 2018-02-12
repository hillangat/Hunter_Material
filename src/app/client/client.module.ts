import { CreateClientComponent } from './create-client/create-client.component';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ClientComponent } from './client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientGridComponent } from './client-grid/client-grid.component';
import { clientRoutes } from './client.routes';


@NgModule({
    imports: [

    ],
    declarations: [
        ClientComponent,
        ClientDetailComponent,
        CreateClientComponent,
        ClientGridComponent
    ],
    exports: [
        ClientComponent,
        ClientDetailComponent,
        CreateClientComponent,
        ClientGridComponent

    ]
})
export class ClientModule {
    public static routes = clientRoutes;
}
