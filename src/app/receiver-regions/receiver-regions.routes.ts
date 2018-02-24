import { ReceiverRegionsComponent } from './receiver-regions.component';
import { ReceiverRegion } from './../shared/beans/ReceiverRegion';
import { Routes } from '@angular/router';
export const receiverRegionRouters: Routes = [
    {
      path: '',
      children: [
        {
          path: '/main',
          component: ReceiverRegionsComponent
        }
      ]
    }
]
