import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'app-dialog-template',
    templateUrl: 'dialog-template.component.html',
    styleUrls: ['dialog-template.component.scss']
})
export class DialogTemplateComponent {

    constructor( public dialogRef: MatDialogRef<DialogTemplateComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {

     }

    public onNoClick(): void {
        this.dialogRef.close();
    }


}
