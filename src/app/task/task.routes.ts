import { TaskGridComponent } from './task-grid/task-grid.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { ViewTaskFieldsComponent } from './view-task-fields/view-task-fields.component';
import { EditTaskFieldsComponent } from './edit-task-fields/edit-task-fields.component';
import { CloneTaskComponent } from './clone-task/clone-task.component';
export const taskRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'details/:taskId',
          component: TaskDetailsComponent
        },
        {
          path: 'grid',
          component: TaskGridComponent
        },
        {
          path: 'create',
          component: EditTaskFieldsComponent
        },
        {
          path: 'view',
          component: ViewTaskFieldsComponent
        },
        {
          path: 'clone/:taskId',
          component: CloneTaskComponent
        }
      ]
    }
]
