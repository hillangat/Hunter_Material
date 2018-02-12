import { ClientComponent } from './client.component';
import { Routes } from '@angular/router';
import { CreateTaskComponent } from 'app/task/create-task/create-task.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientGridComponent } from 'app/client/client-grid/client-grid.component';
export const clientRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'details/:clientId',
          component: ClientDetailComponent
        },
        {
          path: 'grid',
          component: ClientGridComponent
        },
        {
          path: 'create',
          component: CreateTaskComponent
        }
      ]
    }
]
