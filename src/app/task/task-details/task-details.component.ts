import { LoggerService } from 'app/shared/logger/logger-service';
import { Task } from './../../shared/beans/Task';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'app/task/shared/services/task.service';
import { States } from '../../shared/enums/states.enum';

@Component({
    moduleId: module.id,
    selector: 'app-task-details',
    templateUrl: 'task-details.component.html',
    styleUrls: ['task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

    private taskId: number;
    private task: Task;
    private state: States;

    constructor(
        private activatedRoute: ActivatedRoute,
        private taskService: TaskService,
        private logger: LoggerService
    ) {
        const _taskId: string = activatedRoute.snapshot.paramMap.get( 'taskId' );
        this.taskId = _taskId != null ? Number( _taskId ) : 0;
    }

    public ngOnInit(): void {
        this.loadTask();
    }

    private loadTask() {
        this.state = States.LOADING;
        this.taskService
            .getTaskById( this.taskId )
            .subscribe(
                (task: Task) => {
                    this.task = task;
                    this.state = States.SUCCESS;
                },
                ( error: any ) => {
                    this.logger.log( 'Error occurred while loading task by task id: ' + JSON.stringify( error ) );
                    this.state = States.ERROR_OCCURRED;
                }
            );
    }

    public reloadTask() {
        this.loadTask();
    }




}
