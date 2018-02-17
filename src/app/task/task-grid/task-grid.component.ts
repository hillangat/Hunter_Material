import { DynGridBarAction } from './../../shared/dynamic-grid/shared/dyn-grid-bar-action';
import { TaskStatusComponent } from './../task-status/task-status.component';
import { DynamicGridComponent } from './../../shared/dynamic-grid/dynamic-grid.component';
import { LoggerService } from '../../shared/logger/logger-service';
import {Element} from '../../material-code/material-code/material-code.component';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DialogTemplateComponent } from '../../sample-codes/dialog-template/dialog-template.component';
import { TaskService } from '../shared/services/task.service';
import { DynGridProperties } from '../../shared/dynamic-grid/shared/dyn-grid-properties';
import { DynGridService } from '../../shared/dynamic-grid/services/dyn-grid.service/dyn-grid.service';
import { ConfirmGridActionComponent } from '../../shared/confirm-grid-action/confirm-grid-action.component';
import { CellActionBean } from '../../shared/beans/cell-action-bean';
import { Router } from '@angular/router';
import { HunterServerResponse } from '../../shared/beans/ServerResponse';
import { ServerStatusesEnum, ServerStatusResponse } from '../../shared/beans/server-status-response';

@Component({
    moduleId: module.id,
    selector: 'app-task-grid',
    templateUrl: 'task-grid.component.html',
    styleUrls: ['task-grid.component.scss']
})
export class TaskGridComponent implements OnInit {

    private dynGridProps: DynGridProperties;
    private readTasksURL: string;

    @ViewChild('taskGrid') private taskGrid: DynamicGridComponent;

    constructor(
        private taskService: TaskService,
        private dynGridService: DynGridService,
        private logger: LoggerService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    public ngOnInit() {
        const url: string = this.taskService.getTasksURL + '/all';
        this.dynGridProps = this.taskService.getGenericGridDataProps( url, 'TASK_GRID', this.taskService.getTaskGridDynGridBarActions() );
        this.getTaskURL();
    }

    public getTaskURL() {
        this.readTasksURL = this.taskService.getReadTasksURL();
    }

    public onClickActionCell( cellAction: CellActionBean ) {
        this.logger.log( JSON.stringify(cellAction) );
        switch ( cellAction.actionHeader.headerId  ) {
            case 'taskLifeStatus' : ;
                this.setLifeStatusDialogInfo( cellAction );
                this.showDialogForStatus( cellAction );
                break;
            case 'clone' :
                this.router.navigate( ['./clone/' + cellAction.cellRow['taskId']] );
                break;
            case 'process' :
                this.setProcessDialogInfo( cellAction );
                this.openDialog( cellAction );
                break;
            case 'delete' :
                this.setDeleteDialogInfo( cellAction );
                this.openDialog( cellAction );
                break;
            case 'open' : ;
                this.router.navigateByUrl( '/task/details/' + cellAction.cellRow.taskId +  '/fields' );
                break;
            default : return;
        }
    }

    public onClickGridBarAction( dynGridBarAction: DynGridBarAction ) {
        if ( dynGridBarAction.key === 'createTask' ) {
            this.router.navigateByUrl('/task/create');
        } else {
            this.logger.error( 'Grid bar action not supported >> ' + dynGridBarAction.key );
        }
    }

    public showDialogForStatus( cellAction: CellActionBean ) {
        const dialogRef = this.dialog.open(TaskStatusComponent, {
            width: '600px',
            data: cellAction
          });
          dialogRef.afterClosed().subscribe(result => {
              this.handleConfirmAction( cellAction );
          });
          return false;
    }

    public openDialog( cellAction: CellActionBean ): boolean {
        const dialogRef = this.dialog.open(ConfirmGridActionComponent, {
          width: '600px',
          data: cellAction
        });
        dialogRef.afterClosed().subscribe(result => {
            this.handleConfirmAction( cellAction );
        });
        return false;
    }

    public getNextLifeStatus( currStatus: string ) {
        if ( currStatus === 'Draft' ) {
            return 'Review';
        } else if ( currStatus === 'Review' ) {
            return 'Approved';
        }
    }

    public handleConfirmAction( cellAction: CellActionBean ) {
        if ( cellAction.dialogSelButton !== 'YES' ) {
            return;
        }
        const taskId: number = cellAction.cellRow['taskId'];
        switch ( cellAction.actionHeader.headerId  ) {
            case 'taskLifeStatus' : ;
                const toStatus: string = cellAction.entryValues;
                this.taskService
                    .updateTaskStatus( taskId, toStatus )
                    .subscribe(
                        ( response: ServerStatusResponse ) => {
                            if ( response.status === ServerStatusesEnum.Success ) {
                                this.taskGrid.refreshGrid();
                            }
                            this.logger.log( JSON.stringify( response ) );
                        },
                        (error: any) => {
                            this.logger.error( JSON.stringify( error ) );
                        }
                    );
                break;
            case 'clone' :
                // TODO Implement
                break;
            case 'process' :
                this.taskService
                    .processTask( taskId )
                    .subscribe(
                        ( response: ServerStatusResponse ) => {
                            if ( response.status === ServerStatusesEnum.Success ) {
                                this.taskGrid.refreshGrid();
                            }
                            this.logger.log( JSON.stringify( response ) );
                        },
                        (error: any) => {
                            this.logger.error( JSON.stringify( error ) );
                        }
                    );
                break;
            case 'delete' :
                this.taskService
                    .deleteTask( taskId )
                    .subscribe(
                        ( response: HunterServerResponse ) => {
                            if ( response.status === ServerStatusesEnum.Success ) {
                                this.taskGrid.refreshGrid();
                            }
                            this.logger.log( JSON.stringify( response ) );
                        },
                        (error: any) => {
                            this.logger.error( JSON.stringify( error ) );
                        }
                    );
                break;
            case 'open' : ;
                // TODO Implement
                break;
            default : return;
        }
    }


    public setDeleteDialogInfo( cellAction: CellActionBean ) {
        cellAction['message'] = 'The selected task will be deleted. Are you sure?';
        cellAction['notIconName'] = 'do_not_disturb';
        cellAction['yesIconName'] = 'delete';
        cellAction['title'] = 'Delete Task';
        cellAction['titleIcon'] = 'delete';
        cellAction['yesButtonText'] = 'Delete';
        cellAction['noButtonText'] = 'Close';
    }

    public setProcessDialogInfo( cellAction: CellActionBean ) {
        cellAction['message'] = 'The selected task will be processed. Are you sure?';
        cellAction['notIconName'] = 'do_not_disturb';
        cellAction['yesIconName'] = 'play_circle_outline';
        cellAction['title'] = 'Process Task';
        cellAction['titleIcon'] = 'play_circle_outline';
        cellAction['yesButtonText'] = 'Process';
        cellAction['noButtonText'] = 'Close';
    }

    public setLifeStatusDialogInfo( cellAction: CellActionBean ) {
        cellAction['message'] = 'This action will change task status. Please select the right status button.';
        cellAction['notIconName'] = 'do_not_disturb';
        cellAction['yesIconName'] = 'done';
        cellAction['title'] = 'Update Task Status';
        cellAction['titleIcon'] = 'done';
        cellAction['yesButtonText'] = 'Update Status';
        cellAction['noButtonText'] = 'Close';
    }
}
