import { ClientComponent } from './client.component';
import { Routes } from '@angular/router';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientGridComponent } from 'app/client/client-grid/client-grid.component';
import { EditTaskFieldsComponent } from '../task/edit-task-fields/edit-task-fields.component';
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
          path: 'fields/edit',
          component: EditTaskFieldsComponent
        }
      ]
    }
]
