import { TaskGridComponent } from './task-grid/task-grid.component';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { SharedModule } from '../shared/shared.module';
import { taskRoutes } from './task.routes';
import { RouterModule } from '@angular/router';
import { TaskService } from './shared/services/task-service';


@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailsComponent,
    TaskGridComponent
  ],
  imports: [
    CommonModule,  /** This must be the first import for material design to work */
    RouterModule.forChild( taskRoutes ),
    SharedModule
  ],
  providers: [ TaskService ]
})
export class TaskModule {
  public static routes = taskRoutes;
}
