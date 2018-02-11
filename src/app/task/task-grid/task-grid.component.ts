import { LoggerService } from '../../shared/logger/logger-service';
import {Element} from '../../material-code/material-code/material-code.component';
import { Component } from '@angular/core';
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

@Component({
    moduleId: module.id,
    selector: 'app-task-grid',
    templateUrl: 'task-grid.component.html',
    styleUrls: ['task-grid.component.scss']
})
export class TaskGridComponent implements OnInit {

    private dynGridProps: DynGridProperties;
    private readTasksURL: string;

    constructor(
        private taskService: TaskService,
        private dynGridService: DynGridService,
        private logger: LoggerService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    public ngOnInit() {
        this.getTaskURL();
    }

    public getTaskURL() {
        this.readTasksURL = this.taskService.getReadTasksURL();
    }

    public onClickActionCell( cellAction: CellActionBean ) {
        this.logger.log( JSON.stringify(cellAction) );
        switch ( cellAction.actionHeader.headerId  ) {
            case 'taskLifeStatus' : ;
                break;
            case 'clone' :
                this.setCloneDialogInfo( cellAction );
                this.openDialog( cellAction );
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
                this.router.navigateByUrl( '/task/details/' + cellAction.cellRow.taskId );
                break;
            default : return;
        }
    }

    public onClickNewRecButton() {
        this.router.navigateByUrl('/task/create');
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
        this.logger.log( JSON.stringify(cellAction) );
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

    public setCloneDialogInfo( cellAction: CellActionBean ) {
        cellAction['message'] = 'The selected task will be cloned. Are you sure?';
        cellAction['notIconName'] = 'do_not_disturb';
        cellAction['yesIconName'] = 'content_copy';
        cellAction['title'] = 'Process Task';
        cellAction['titleIcon'] = 'content_copy';
        cellAction['yesButtonText'] = 'Clone';
        cellAction['noButtonText'] = 'Close';
    }
}
