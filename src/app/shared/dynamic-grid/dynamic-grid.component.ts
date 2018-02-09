import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HunterTableConfig } from './../beans/hunter-table-configs';
import { HunterUtil } from './../utils/hunter-util';
import { DynGridLoadStatesEnum } from './enums/dyn-grid-load-states.enum';
import { Component, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import DynGridHelper from './shared/dyn-grid-helper';
import { Input, Output, OnInit } from '@angular/core';
import { DynGridProperties } from './shared/dyn-grid-properties';
import { DynGridService } from './services/dyn-grid.service/dyn-grid.service';
import { HunterServerResponse } from '../beans/ServerResponse';
import { LoggerService } from '../logger/logger-service';
import { MatTableDataSource, PageEvent, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogTemplateComponent } from '../../sample-codes/dialog-template/dialog-template.component';

@Component({
    moduleId: module.id,
    selector: 'app-dynamic-grid',
    templateUrl: 'dynamic-grid.component.html',
    styleUrls: ['dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnInit, OnDestroy {

    @Input( 'dynGridProps' ) private dynGridProps: DynGridProperties;

    @Output('onClickNewRecButton') private onClickNewRecButton: EventEmitter<void> = new EventEmitter<void>();
    @Output('onRefresh') private onRefresh: EventEmitter<void> = new EventEmitter<void>();
    @Output('onDelRow') private onDelRow: EventEmitter<any> = new EventEmitter<any>();
    @Output('onErrorLoading') private onErrorLoading: EventEmitter<any> = new EventEmitter<any>();
    @Output('onSuccessLoading') private onSuccessLoading: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(MatPaginator) dynGridPaginator: MatPaginator;

    public filterValue = '';

    public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>( [] );
    public displayedColumns: string[] = [];
    public selection: SelectionModel<any> = new SelectionModel<any>(true, []);

    private gridLoadState: DynGridLoadStatesEnum = DynGridLoadStatesEnum.LOADING;
    private gridData: HunterServerResponse;
    private pageEvent: PageEvent;
    public constructor( private logger: LoggerService, private dynGridService: DynGridService, private dialog: MatDialog ) { }

    public ngOnInit(): void {
        this.logger.log( 'Initializing grid data: ' + JSON.stringify( this.dynGridProps ) );
        this.dynGridProps = this.dynGridService.getSampleDefGridDataProps( this.filterValue );
        this.fetchData();
    }

    public fetchData(): void {
        this.gridLoadState = DynGridLoadStatesEnum.LOADING;
        this.dynGridService
            .getGridData( this.dynGridProps.gridDataLoadUrl, this.dynGridProps.defaDynGridDataReq )
            .subscribe(
                ( serverResp: HunterServerResponse ) => {
                    this.gridData = serverResp;
                    this.processServerResp( serverResp );
                    this.gridLoadState = DynGridLoadStatesEnum.SUCCESS;
                    this.onSuccessLoading.emit();
                },
                ( error: any ) => {
                    this.gridLoadState = DynGridLoadStatesEnum.ERROR;
                    this.onErrorLoading.emit();
                }
            );
    }

    public refreshGrid( dynGridProps?: DynGridProperties ): void {
        if ( dynGridProps ) {
            this.dynGridProps = dynGridProps;
        }
        this.fetchData();
    }

    public ngOnDestroy(): void {}

    private processServerResp( resp: HunterServerResponse ): void {
        if ( HunterUtil.isNotEmpty( resp.headers ) ) {
            this.dataSource = new MatTableDataSource<any>( HunterUtil.isNotEmpty( resp.data ) ? resp.data : [] );
            this.displayedColumns = [];
            resp.headers
                .filter( ( h: HunterTableConfig ) => h.show )
                .sort( (a: HunterTableConfig, b: HunterTableConfig) => ( a.index - b.index ) )
                .forEach( ( header: HunterTableConfig ) => this.displayedColumns.push( header.headerId ) );
            this.logger.log( 'Display headers as sorted >>> ' + JSON.stringify( this.displayedColumns ) );
        }
    }

    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle() {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }

    public onPageChange( pageEvent: PageEvent ): PageEvent {
        this.pageEvent = pageEvent;
        this.dynGridProps.defaDynGridDataReq.pageSize = this.pageEvent.pageSize;
        this.dynGridProps.defaDynGridDataReq.pageNo = this.pageEvent.pageIndex + 1;
        this.fetchData();
        return pageEvent;
    }

    openDialog(): boolean {
        const dialogRef = this.dialog.open(DialogTemplateComponent, {
          width: '250px',
          data: { name: 'Sample Name', animal: 'Sample Animal' }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.logger.log('The dialog was closed');
            this.logger.log( result );
        });
        return false;
    }


}
