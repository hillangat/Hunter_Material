import { FormGroup } from '@angular/forms/src/model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CellActionBean } from 'app/shared/beans/cell-action-bean';
import { ConfirmGridActionComponent } from '../../../shared/confirm-grid-action/confirm-grid-action.component';
import { RegionHierarchy } from '../../../shared/beans/region-hierarchy';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.css']
})
export class EditRegionComponent implements OnInit {

  private cellAction: CellActionBean;
  private region: RegionHierarchy;
  private formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmGridActionComponent>,
    private formBuilder: FormBuilder
  ) {
      this.cellAction = data;
      console.log( this.cellAction );
      this.region = this.cellAction.cellRow;
  }

  public closeDialog( dialogSelButton: 'YES' | 'NO' ) {
      this.cellAction.entryValues = this.formGroup.value;
      this.cellAction.dialogSelButton = dialogSelButton;
      this.formGroup.reset();
      this.dialogRef.close( this.cellAction );
  }

  public ngOnInit() {
    this.formGroup = this.formBuilder.group( {
      name: [this.region.name, Validators.required ],
      regionCode: [ this.region.regionCode ],
      population: [ this.region.population ],
      hunterPopuplation: [ this.region.hunterPopuplation ]
    });
  }

}




