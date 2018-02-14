import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../shared/beans/Task';
import { TaskService } from '../shared/services/task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
    moduleId: module.id,
    selector: 'app-view-task-fields',
    templateUrl: 'view-task-fields.component.html',
    styleUrls: ['view-task-fields.component.scss']
})
export class ViewTaskFieldsComponent {

    @Input( 'task' ) private task: Task;
    @Input( 'taskDetail' ) private taskDetail: TaskDetailsComponent;

    constructor() {}

    public reloadTask() {
        this.taskDetail.reloadTask();
    }

}
