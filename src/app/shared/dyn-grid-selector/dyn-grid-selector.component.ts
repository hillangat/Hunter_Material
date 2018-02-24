import { DynGridProperties } from './../dynamic-grid/shared/dyn-grid-properties';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CellActionBean } from './../beans/cell-action-bean';
import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../task/shared/services/task.service';
import { DynGridBarAction } from '../dynamic-grid/shared/dyn-grid-bar-action';
import { LoggerService } from '../logger/logger-service';

@Component({
  selector: 'app-dyn-grid-selector',
  templateUrl: './dyn-grid-selector.component.html',
  styleUrls: ['./dyn-grid-selector.component.css']
})
export class DynGridSelectorComponent {

  private cellAction: CellActionBean;
  private dynGridProps: DynGridProperties;

  constructor(
      private logger: LoggerService,
      private taskService: TaskService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<DynGridSelectorComponent>
    ) {
      console.log( 'confirming >>>>>>>>>>>>>>>>>>>> ' + JSON.stringify(data) );
      this.cellAction = data;
      const actions: DynGridBarAction[] = this.taskService.getTaskGridDynGridBarActions();
      const url: string = this.taskService.getTasksURL + '/all';
      this.dynGridProps = this.taskService.getGenericGridDataProps( url, 'TASK_GRID', actions );
  }

  public closeDialog( dialogSelButton: 'YES' | 'NO' ) {
      this.cellAction['dialogSelButton'] = dialogSelButton;
      this.dialogRef.close( this.cellAction );
  }

  public onSelectionChange( selRows: any[] ): void {
    this.cellAction.entryValues = selRows;
  }

}
