import { TaskSocialMessageComponent } from './task-social-message/task-social-message.component';
import { TaskGroupsComponent } from './task-groups/task-groups.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { ClientService } from './../shared/services/client.service';
import { TaskGridComponent } from './task-grid/task-grid.component';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { SharedModule } from '../shared/shared.module';
import { taskRoutes } from './task.routes';
import { RouterModule } from '@angular/router';
import { TaskService } from './shared/services/task.service';
import { TaskStatusComponent } from './task-status/task-status.component';
import { EditTaskFieldsComponent } from './edit-task-fields/edit-task-fields.component';
import { ViewTaskFieldsComponent } from './view-task-fields/view-task-fields.component';
import { CloneTaskComponent } from './clone-task/clone-task.component';
import { TaskRegionsComponent } from './task-regions/task-regions.component';
import { TaskTextMessageComponent } from './task-text-message/task-text-message.component';
import { TaskEmailMessageComponent } from './task-email-message/task-email-message.component';
import { AddRegionToTaskComponent } from './add-region-to-task/add-region-to-task.component';


@NgModule({
  entryComponents: [ TaskStatusComponent, AddRegionToTaskComponent ],
  declarations: [
    TaskComponent,
    TaskDetailsComponent,
    TaskGridComponent,
    EditTaskFieldsComponent,
    TaskStatusComponent,
    ViewTaskFieldsComponent,
    CloneTaskComponent,
    TaskHistoryComponent,
    TaskTextMessageComponent,
    TaskSocialMessageComponent,
    TaskEmailMessageComponent,
    TaskGroupsComponent,
    TaskRegionsComponent,
    AddRegionToTaskComponent
],
  imports: [
    CommonModule,  /** This must be the first import for material design to work */
    RouterModule.forChild( taskRoutes ),
    SharedModule
  ],
  providers: [ TaskService, ClientService ]
})
export class TaskModule {
  public static routes = taskRoutes;
}
