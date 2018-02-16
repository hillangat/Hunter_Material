import { DynGridBarAction } from './../../shared/dynamic-grid/shared/dyn-grid-bar-action';
import { TaskService } from './../shared/services/task.service';
import { LoggerService } from 'app/shared/logger/logger-service';
import { Component, OnInit, Input } from '@angular/core';
import { CellActionBean } from '../../shared/beans/cell-action-bean';
import { DynGridProperties } from '../../shared/dynamic-grid/shared/dyn-grid-properties';

@Component({
    moduleId: module.id,
    selector: 'app-task-history',
    templateUrl: 'task-history.component.html',
    styleUrls: ['task-history.component.scss']
})
export class TaskHistoryComponent implements OnInit {

    private dynGridProps: DynGridProperties;
    private readTasksURL: string;

    @Input('taskId') private taskId: number;

    constructor( private logger: LoggerService, private taskService: TaskService ) {}

    public ngOnInit() {
        this.updateProps();
        this.getTaskURL( this.taskId );
    }

    public onClickActionCell( cellAction: CellActionBean ) {
        this.logger.log( 'Cell clicked!' + JSON.stringify( cellAction ) );
    }

    public onClickGridBarAction( dynGridBarAction: DynGridBarAction ) {
        // TODO implement when necessary
        this.logger.log( 'Bar action not supported >>> ' + JSON.stringify( dynGridBarAction ) );
    }

    public updateProps() {
        this.dynGridProps = this.taskService.getGenericGridDataProps(
            this.taskService.getTaskHistoryURL( this.taskId ), 'TASK_HISTORY', []
        );
    }

    public getTaskURL( taskId: number ) {
        this.readTasksURL = this.taskService.getTaskHistoryURL( taskId );
    }

}
