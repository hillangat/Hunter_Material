import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CellActionBean } from '../beans/cell-action-bean';

@Component({
    moduleId: module.id,
    selector: 'app-confirm-grid-action',
    templateUrl: 'confirm-grid-action.component.html',
    styleUrls: ['confirm-grid-action.component.scss']
})
export class ConfirmGridActionComponent {
    private cellAction: CellActionBean;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmGridActionComponent> ) {
        console.log( 'confirming >>>>>>>>>>>>>>>>>>>> ' + JSON.stringify(data) );
        this.cellAction = data;
    }

    public closeDialog( dialogSelButton: 'YES' | 'NO' ) {
        this.cellAction['dialogSelButton'] = dialogSelButton;
        this.dialogRef.close( this.cellAction );
    }
}



