import { TaskGridComponent } from './task-grid/task-grid.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { CreateTaskComponent } from 'app/task/create-task/create-task.component';
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
          component: CreateTaskComponent
        }
      ]
    }
]
