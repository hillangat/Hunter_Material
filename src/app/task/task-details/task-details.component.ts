import { LoggerService } from 'app/shared/logger/logger-service';
import { Task } from './../../shared/beans/Task';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'app/task/shared/services/task.service';
import { States } from '../../shared/enums/states.enum';
import { MatTabGroup } from '@angular/material';

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
    private selectedIndex = 0;

    @ViewChild( 'detailsTabs' ) private detailsTabs: MatTabGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private taskService: TaskService,
        private logger: LoggerService,
        private route: ActivatedRoute
    ) {
        const _taskId: string = activatedRoute.snapshot.paramMap.get( 'taskId' );
        this.taskId = _taskId != null ? Number( _taskId ) : 0;
    }

    public ngOnInit(): void {
        this.setActiveTab();
        this.loadTask();
    }

    public setActiveTab() {
        const activeTab: string = this.route.snapshot.paramMap.get('activeTab');
        switch ( activeTab ) {
            case 'fields' : this.selectedIndex = 0; break;
            case 'message': this.selectedIndex = 1; break;
            case 'groups' : this.selectedIndex = 2; break;
            case 'regions': this.selectedIndex = 3; break;
            case 'history': this.selectedIndex = 4; break;
            default :       this.selectedIndex = 0; break;
        }
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
