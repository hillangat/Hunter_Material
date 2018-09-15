import { CellActionBean } from './../../shared/beans/cell-action-bean';
import { AlertService } from 'app/shared/services/alert.service';
import { DynGridProperties } from './../../shared/dynamic-grid/shared/dyn-grid-properties';
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { ReceiverRegionService } from '../../receiver-regions/services/receiver-region.service';
import { Dropdown } from '../../shared/hunter-combobox/shared/hunter-combobox-input';
import { SelectValue } from '../../shared/beans/SelectValue';
import { HunterComboboxComponent } from '../../shared/hunter-combobox/hunter-combobox.component';
import { DynamicGridComponent } from '../../shared/dynamic-grid/dynamic-grid.component';
import { LoggerService } from '../../shared/logger/logger-service';
import { TaskService } from '../shared/services/task.service';
import { DynGridBarAction } from '../../shared/dynamic-grid/shared/dyn-grid-bar-action';
import { DynGridDataReq } from '../../shared/beans/dyn-grid-data-req';
import { GridFieldUserInput } from '../../shared/dynamic-grid/shared/grid-field-user-input';
import { HunterConstants } from '../../shared/constants/HunterConstants';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HunterServerResponse } from '../../shared/beans/ServerResponse';
import { ServerStatusesEnum } from '../../shared/beans/server-status-response';

@Component({
  selector: 'app-add-region-to-task',
  templateUrl: './add-region-to-task.component.html',
  styleUrls: ['./add-region-to-task.component.css']
})
export class AddRegionToTaskComponent implements OnInit {

  @ViewChild('regionCombobox') public regionCombobox: HunterComboboxComponent;
  private dynGridProps: DynGridProperties;
  @ViewChild('taskRegionsGrid') private taskRegionsGrid: DynamicGridComponent;
  @Input('taskId') private taskId: number;

  private selectedRegions: any[] = [];

  constructor(
      private regionService: ReceiverRegionService,
      private logger: LoggerService,
      private taskService: TaskService,
      private alertService: AlertService,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.dynGridProps = this.getDynGridProperties();
  }

  public onSelectionChange(event) {
      this.selectedRegions = event;
  }

  public onChangeDropdown(region: Dropdown): void {
    if ( !region.selVal ) {
        this.setValsOnDropdownChange(region.name, [])
        return;
    }
    switch ( region.name ) {
        case 'Country' :
            this.regionService
                .getCountiesSelVal(Number(region.selVal.value))
                .subscribe(
                    (selVals: SelectValue[]) => {
                        this.setValsOnDropdownChange(region.name, selVals)
                    },
                    (error: any) => {
                        this.setValsOnDropdownChange(region.name, [])
                    }
                )
            break;
        case 'County' :
            this.regionService
                .getConstituenciesSelVal(Number(region.selVal.value))
                .subscribe((selVals: SelectValue[]) => {
                    this.setValsOnDropdownChange(region.name, selVals)
                },
                (error: any) => {
                    this.setValsOnDropdownChange(region.name, [])
                })
            break;
        case 'Constituency' :
            this.regionService
                .getWardsSelVal(Number(region.selVal.value))
                .subscribe((selVals: SelectValue[]) => {
                    this.setValsOnDropdownChange(region.name, selVals)
                },
                (error: any) => {
                    this.setValsOnDropdownChange(region.name, [])
                })
            break;
        default: this.setValsOnDropdownChange(region.name, [])
    }
}

public setValsOnDropdownChange(name: string, selVals: SelectValue[]): void {
    this.regionCombobox.setValsOnDropdownChange(name, selVals);
}


public onClickGridBarAction( dynGridBarAction: DynGridBarAction ) {
    if (dynGridBarAction.key === 'addRegion') {
        if (this.selectedRegions.length === 0) {
            this.alertService.error('Please selected at least one region to add.')
        } else {
            const taskId = this.data.entryValues.taskId;
            const selValues: SelectValue[] = this.selectedRegions.map(r => {
                return {text: r.countyName, value: String(r.countyId)};
            });
            this.taskService
                .addRegionToTask(taskId, 'COUNTY', selValues)
                .subscribe(
                    ( resp: HunterServerResponse ) => {
                        if ( resp.status === ServerStatusesEnum.Success ) {
                            // this.alertService.success('Successfully added region to task')
                        }
                        this.logger.log( JSON.stringify( resp ) );
                    }
                )
        }
    }
}

public onClickActionCell( cellAction: CellActionBean ) {
this.logger.log('onClickActionCell >>>> ' + JSON.stringify(cellAction) );
}

private getDynGridProperties (): DynGridProperties {

    const props: DynGridProperties = new DynGridProperties();
    props.filterable = true;
    props.gridDataLoadUrl = 'http://localhost:8080/Hunter/region/action/counties/read/1';
    props.pageable = true;
    props.pageSizes = [ 10, 25, 50, 100, 200 ];
    props.pageSize = 10;
    props.pageNo = 1;
    props.refreshable = true;
    props.sortable = true;

    props.defaDynGridDataReq = new DynGridDataReq();
    props.defaDynGridDataReq.reference = 'COUNTY_JSONS';
    props.defaDynGridDataReq.pageNo = props.pageNo;
    props.defaDynGridDataReq.pageSize = props.pageSize;

    props.defaDynGridDataReq.filterBy = [];
    props.defaDynGridDataReq.orderBy = [];

    const barActions: DynGridBarAction[] = [];
    const createTask: DynGridBarAction = new DynGridBarAction();
    createTask.text = 'Add Selected Regions To Task';
    createTask.displayType = HunterConstants.DISPLAY_TYP_BUTTON;
    createTask.icon = 'add';
    createTask.index = 1;
    createTask.key = 'addRegion';
    barActions.push( createTask );
    barActions.sort( (a: DynGridBarAction, b: DynGridBarAction) => (a.index - b.index) );
    props.dynGridBarActions = barActions;

    return props;
}


}
