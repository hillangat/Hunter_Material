import { ConfirmGridActionComponent } from '../../shared/confirm-grid-action/confirm-grid-action.component';
import { SelectValue } from './../../shared/beans/SelectValue';
import { CellActionBean } from './../../shared/beans/cell-action-bean';
import { MatDialog } from '@angular/material';
import { LoggerService } from './../../shared/logger/logger-service';
import { Component, ViewChild, Input } from '@angular/core';
import { DynamicGridComponent } from '../../shared/dynamic-grid/dynamic-grid.component';
import { DynGridBarAction } from '../../shared/dynamic-grid/shared/dyn-grid-bar-action';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TaskService } from 'app/task/shared/services/task.service';
import { DynGridProperties } from '../../shared/dynamic-grid/shared/dyn-grid-properties';
import { HunterConstants } from 'app/shared/constants/HunterConstants';
import { AddRegionToTaskComponent } from '../add-region-to-task/add-region-to-task.component';
import { HunterUtil } from '../../shared/utils/hunter-util';
import { HunterServerResponse } from '../../shared/beans/ServerResponse';
import { ServerStatusesEnum } from '../../shared/beans/server-status-response';

@Component({
    moduleId: module.id,
    selector: 'app-task-regions',
    templateUrl: 'task-regions.component.html',
    styleUrls: ['task-regions.component.scss']
})
export class TaskRegionsComponent implements OnInit {

    @ViewChild('taskRegionsGrid') private taskRegionsGrid: DynamicGridComponent;
    @Input('taskId') private taskId: number;
    private dynGridProps: DynGridProperties;
    private url: string;
    private selectedRegions: any[]

    constructor(
        private logger: LoggerService,
        private taskService: TaskService,
        private dialog: MatDialog
    ) {}

    public ngOnInit() {
        this.url = this.taskService.getTaskRegions + this.taskId;
        this.dynGridProps = this.taskService.getGenericGridDataProps(
            this.url, 'ADD_TASK_REGIONS', this.getAddRegionBarActions() );
    }

    public onClickActionCell( cellAction: CellActionBean ) {
        alert( JSON.stringify(cellAction) );
        switch ( cellAction.actionHeader.headerId  ) {
            case 'taskLifeStatus' : ;
                break;
            case 'clone' :
                break;
            case 'process' :
                break;
            case 'delete' :
                break;
            case 'open' : ;
                break;
            default : return;
        }
    }

    public onClickGridBarAction( dynGridBarAction: DynGridBarAction ) {
        console.log('dynGridBarAction >> ', dynGridBarAction)
        if ( dynGridBarAction.key === 'addRegion' ) {
            const cellActionBean: CellActionBean = this.getCellBean();
            cellActionBean.entryValues = {taskId: this.taskId}
            this.openAddRegionDialog(cellActionBean)
        } else if ( dynGridBarAction.key === 'removeRegion' ) {
            console.log('dynGridBarAction >>>> ', )
            this.openDialog(dynGridBarAction)
        }
    }

    public getAddRegionBarActions(): DynGridBarAction[] {
        const barActions: DynGridBarAction[] = [];
        const addRegionActionBar: DynGridBarAction = new DynGridBarAction();
        addRegionActionBar.text = 'Add Region';
        addRegionActionBar.displayType = HunterConstants.DISPLAY_TYP_BUTTON;
        addRegionActionBar.icon = 'add';
        addRegionActionBar.index = 1;
        addRegionActionBar.data = {taskId: this.taskId},
        addRegionActionBar.key = 'addRegion';

        const removeRegionActionBar: DynGridBarAction = new DynGridBarAction();
        removeRegionActionBar.text = 'Remove Selected Regions';
        removeRegionActionBar.displayType = HunterConstants.DISPLAY_TYP_BUTTON;
        removeRegionActionBar.icon = 'clear';
        removeRegionActionBar.index = 2;
        removeRegionActionBar.data = this.selectedRegions,
        removeRegionActionBar.key = 'removeRegion';
        barActions.push( removeRegionActionBar );

        barActions.push( addRegionActionBar );
        barActions.sort( (a: DynGridBarAction, b: DynGridBarAction) => (a.index - b.index) );
        return barActions;
    }

    private getCellBean(): CellActionBean {
        const cellAction: CellActionBean = new CellActionBean();
        cellAction.title = 'Add Region to Task';
        cellAction.yesButtonText = 'Add';
        cellAction.noButtonText = 'Cancel';
        cellAction.message = 'Selected region will be added to task.';
        cellAction.notIconName = 'do_not_disturb';
        cellAction.yesIconName = 'add';
        cellAction.titleIcon = 'add';
        cellAction.entryValues = {taskId: this.taskId};
        return cellAction;
    }

    public openAddRegionDialog(cellAction: CellActionBean) {
        const dialogRef = this.dialog.open(AddRegionToTaskComponent, {
            width: '1200px',
            data: cellAction
        });
        dialogRef.afterClosed().subscribe( ( actionBean: CellActionBean) => {
            if ( actionBean && actionBean.dialogSelButton === 'YES' && HunterUtil.isNotEmpty( actionBean.entryValues ) ) {
                alert(JSON.stringify(cellAction))
            }
        });
    }

    public onSelectionChange( event ): void {
        this.selectedRegions = event;
        console.log('Selected task regions >>> ', this.selectedRegions)
    }

    public openDialog( dynGridBarAction: DynGridBarAction ): boolean {

        const cellAction: CellActionBean = new CellActionBean();
        cellAction.title = 'Remove selected reason';
        cellAction.yesButtonText = 'Remove';
        cellAction.noButtonText = 'Cancel';
        cellAction.message = 'Selected regions will be removed from task. Are you sure?';
        cellAction.notIconName = 'do_not_disturb';
        cellAction.yesIconName = 'add';
        cellAction.titleIcon = 'add';
        cellAction.entryValues = this.selectedRegions.map(r => Object({text: undefined, value: r.regionId}));

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
        const selValues: SelectValue[] = this.selectedRegions
            .map( r => Object({text: undefined, value: r.regionId}) )

        this.taskService
            .removeSelRegionsFromTask( this.taskId, selValues )
            .subscribe(
                ( response: HunterServerResponse ) => {
                    if ( response.status === ServerStatusesEnum.Success ) {
                        this.logger.log('Successfully removed selected regions from task')
                    }
                },
                (error: any) => {
                    this.logger.error( JSON.stringify( error ) );
                }
            );
    }

}
