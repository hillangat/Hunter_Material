import { ServerStatusResponse } from 'app/shared/beans/server-status-response';
import { HunterUtil } from './../../shared/utils/hunter-util';
import { DynamicGridComponent } from './../../shared/dynamic-grid/dynamic-grid.component';
import { ServerStatusesEnum } from './../../shared/beans/server-status-response';
import { HunterServerResponse } from './../../shared/beans/ServerResponse';
import { ConfirmGridActionComponent } from './../../shared/confirm-grid-action/confirm-grid-action.component';
import { TaskService } from './../shared/services/task.service';
import { DynGridBarAction } from './../../shared/dynamic-grid/shared/dyn-grid-bar-action';
import { CellActionBean } from './../../shared/beans/cell-action-bean';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LoggerService } from '../../shared/logger/logger-service';
import { Router } from '@angular/router';
import { DynGridProperties } from '../../shared/dynamic-grid/shared/dyn-grid-properties';
import { HunterConstants } from '../../shared/constants/HunterConstants';
import { MatDialog } from '@angular/material';
import { DynGridSelectorComponent } from '../../shared/dyn-grid-selector/dyn-grid-selector.component';
import { Task } from '../../shared/beans/Task';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'app-task-groups',
    templateUrl: 'task-groups.component.html',
    styleUrls: ['task-groups.component.scss']
})
export class TaskGroupsComponent implements OnInit {

    private readTasksURL: string;
    private dynGridProps: DynGridProperties;

    @ViewChild('taskGroupsGrid') private taskGroupsGrid: DynamicGridComponent;

    @Input('taskId') private taskId: number;

    constructor(
        private logger: LoggerService,
        private router: Router,
        private taskService: TaskService,
        private dialog: MatDialog,
        private alertService: AlertService
    ) { }

    public ngOnInit(): void {
        this.createGridProps();
    }

    public onClickActionCell( cellAction: CellActionBean ) {
        this.logger.log( JSON.stringify(cellAction) );
        switch ( cellAction.actionHeader.headerId  ) {
            case 'delete' :
                this.setDeleteDialogInfo( cellAction );
                this.openDialog( cellAction );
                break;
            default : return;
        }
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

    public handleConfirmAction( cellAction: CellActionBean ) {
        if ( cellAction.dialogSelButton !== 'YES' ) {
            return;
        }
        const groupId: number = cellAction.cellRow['groupId'];
        switch ( cellAction.actionHeader.headerId  ) {
            case 'delete' :
                this.taskService
                    .removeGroupFromTask( this.taskId, groupId )
                    .subscribe(
                        ( response: HunterServerResponse ) => {
                            if ( response.status === ServerStatusesEnum.Success ) {
                                this.taskGroupsGrid.refreshGrid();
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

    public onClickGridBarAction( dynGridBarAction: DynGridBarAction ) {
        if ( dynGridBarAction.key === 'addTaskGroup' ) {
            const cellAction: CellActionBean = new CellActionBean();
            cellAction.title = 'Add Receiver Groups to Selected Task';
            cellAction.yesButtonText = 'Add Selected Groups';
            cellAction.noButtonText = 'Cancel';
            cellAction.message = 'This action will change task status. Please select the right status button.';
            cellAction.notIconName = 'do_not_disturb';
            cellAction.yesIconName = 'add';
            cellAction.titleIcon = 'add';
            cellAction.dynGridURL = this.taskService.getAvailGroupsForDynGrid;
            cellAction.dynGridProps = this.taskService.getGenericGridDataProps(
                    cellAction.dynGridURL, 'AVAIL_RECEIVER_GROUPS',
                    this.taskService.getTaskGridDynGridBarActions(),
                );
            const dialogRef = this.dialog.open(DynGridSelectorComponent, {
                width: '1200px',
                data: cellAction
              });
              dialogRef.afterClosed().subscribe( ( actionBean: CellActionBean) => {
                  if ( actionBean && actionBean.dialogSelButton === 'YES' && HunterUtil.isNotEmpty( actionBean.entryValues ) ) {
                      const taskrows: any[] = actionBean.entryValues as any[];
                      const groupIds: number[] = taskrows.map( ( group: any ) => group['groupId'] );
                      this.logger.log( 'Adding selected groups to task: ' + JSON.stringify( groupIds ) );
                      this.taskService
                          .addGroupToTask( this.taskId, groupIds )
                          .subscribe(
                              (resp: ServerStatusResponse) => {
                                if ( resp.status === 'Success' ) {
                                    this.taskGroupsGrid.refreshGrid();
                                }
                                this.logger.log( JSON.stringify( resp ) );
                              },
                              ( error: any ) => {
                                  this.logger.error( JSON.stringify( error ) );
                              }
                          );
                  }
              });
        } else {
            this.logger.error( 'Grid bar action not supported >> ' + dynGridBarAction.key );
        }
    }

    private setDeleteDialogInfo( cellAction: CellActionBean ) {
        cellAction['message'] = 'The selected group ( ' + cellAction.cellRow['groupName'] + ' ) will be deleted. Are you sure?';
        cellAction['notIconName'] = 'do_not_disturb';
        cellAction['yesIconName'] = 'delete';
        cellAction['title'] = 'Remove Task Group';
        cellAction['titleIcon'] = 'delete';
        cellAction['yesButtonText'] = 'Remove';
        cellAction['noButtonText'] = 'Close';
    }

    private createGridProps(): void {
        const url: string = this.taskService.getReadTaskGroupsURL( this.taskId );
        this.dynGridProps = this.taskService.getGenericGridDataProps( url, 'TASK_GROUPS', this.getBarActions() );
    }

    private getBarActions() {
        const barActions: DynGridBarAction[] = [];
        const addTaskGroup: DynGridBarAction = new DynGridBarAction();
        addTaskGroup.text = 'Add Group To Task';
        addTaskGroup.displayType = HunterConstants.DISPLAY_TYP_BUTTON;
        addTaskGroup.icon = 'add';
        addTaskGroup.index = 1;
        addTaskGroup.key = 'addTaskGroup';
        barActions.push( addTaskGroup );
        barActions.sort( (a: DynGridBarAction, b: DynGridBarAction) => (a.index - b.index) );
        return barActions;
    }

}
