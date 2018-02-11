import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CellActionBean } from '../../shared/beans/cell-action-bean';

@Component({
    moduleId: module.id,
    selector: 'app-task-status',
    templateUrl: 'task-status.component.html',
    styleUrls: ['task-status.component.scss']
})
export class TaskStatusComponent {

    private cellAction: CellActionBean;

    private isDraftSel: boolean;
    private isReviewSel: boolean;
    private isApprovedSel: boolean
    private isProcessedSel: boolean;

    private isStatusUpdatable: boolean;

    constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TaskStatusComponent> ) {
        this.cellAction = data;
        const currStatus: string = this.cellAction.cellRow['taskLifeStatus'];
        this.isDraftSel = currStatus === 'Draft';
        this.isReviewSel = currStatus === 'Review';
        this.isApprovedSel = currStatus === 'Approved';
        this.isProcessedSel = currStatus === 'Processed';
        this.isStatusUpdatable = currStatus === 'Approved' || currStatus === 'Processed' ;
    }

    public closeDialog( dialogSelButton: 'YES' | 'NO' ) {
        this.cellAction['dialogSelButton'] = dialogSelButton;
        this.dialogRef.close( this.cellAction );
    }

    public selSelStatus( selStatus: any ): void {
        this.cellAction.entryValues = selStatus.value;
    }
}
