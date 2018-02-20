import { HunterUtil } from './../utils/hunter-util';
import { GridFieldUserInput } from './shared/grid-field-user-input';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HunterTableConfig } from './../beans/hunter-table-configs';
import { DynGridLoadStatesEnum } from './enums/dyn-grid-load-states.enum';
import { Component, OnDestroy, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import DynGridHelper from './shared/dyn-grid-helper';
import { Input, Output, OnInit } from '@angular/core';
import { DynGridProperties } from './shared/dyn-grid-properties';
import { DynGridService } from './services/dyn-grid.service/dyn-grid.service';
import { HunterServerResponse } from '../beans/ServerResponse';
import { LoggerService } from '../logger/logger-service';
import { MatTableDataSource, PageEvent, MatPaginator, MatDialog, Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogTemplateComponent } from '../../sample-codes/dialog-template/dialog-template.component';
import { CellActionBean } from '../beans/cell-action-bean';
import { AlertService } from 'app/shared/services/alert.service';
import { OverlayService } from '../overlay/shared/overlay.service';
import { DynGridBarAction } from './shared/dyn-grid-bar-action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectValue } from '../beans/SelectValue';
import { filter } from 'RXJS/operators';
import { OperationEnum } from './enums/operation.enum';

@Component({
    moduleId: module.id,
    selector: 'app-dynamic-grid',
    templateUrl: 'dynamic-grid.component.html',
    styleUrls: ['dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnInit, OnDestroy {

    @Input( 'dynGridProps' ) private dynGridProps: DynGridProperties;
    @Input( 'percentWidth' ) private percentWidth: number;

    @Output('onClickGridBarAction') private onClickGridBarAction: EventEmitter<DynGridBarAction> = new EventEmitter<DynGridBarAction>();
    @Output('onRefresh') private onRefresh: EventEmitter<void> = new EventEmitter<void>();
    @Output('onDelRow') private onDelRow: EventEmitter<any> = new EventEmitter<any>();
    @Output('onErrorLoading') private onErrorLoading: EventEmitter<any> = new EventEmitter<any>();
    @Output('onSuccessLoading') private onSuccessLoading: EventEmitter<any> = new EventEmitter<any>();
    @Output('onClickActionCell') private onClickActionCell: EventEmitter<CellActionBean> = new EventEmitter<CellActionBean>();

    @ViewChild(MatPaginator) dynGridPaginator: MatPaginator;

    public currFilterHeader: HunterTableConfig;
    public filterValue = '';
    public filterX: number;
    public filterY: number;
    public showFilter = false;
    public filterWidth = 300;
    public filterFormGroup: FormGroup;
    public filterOperations: SelectValue[];

    public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>( [] );
    public displayedColumns: string[] = [];
    public selection: SelectionModel<any> = new SelectionModel<any>(true, []);

    private gridLoadState: DynGridLoadStatesEnum = DynGridLoadStatesEnum.LOADING;
    private gridData: HunterServerResponse;
    private pageEvent: PageEvent;
    private loadingData: boolean;

    public constructor(
        private logger: LoggerService,
        private dynGridService: DynGridService,
        private dialog: MatDialog,
        private alertService: AlertService,
        private overLayService: OverlayService,
        private elRef: ElementRef,
        private formBuilder: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.logger.log( 'Initializing grid data: ' + JSON.stringify( this.dynGridProps ) );
        this.dynGridProps = this.dynGridProps ? this.dynGridProps : this.dynGridService.getSampleDefGridDataProps( this.filterValue );
        this.fetchData( true );
        this.createFilterOperations();
        this.createFilterForm();
    }

    public fetchData( initializing: boolean, showOverlay?: boolean ): void {
        this.updateGridState( DynGridLoadStatesEnum.LOADING, initializing );
        if ( showOverlay ) {
            this.overLayService.openOverlay( true, 'Loading data' );
        }
        this.dynGridService
            .getGridData( this.dynGridProps.gridDataLoadUrl, this.dynGridProps.defaDynGridDataReq )
            .subscribe(
                ( serverResp: HunterServerResponse ) => {
                    this.gridData = serverResp;
                    this.processServerResp( serverResp );
                    this.updateGridState( DynGridLoadStatesEnum.SUCCESS, initializing );
                    this.onSuccessLoading.emit();
                    if ( showOverlay ) {
                        this.overLayService.removeOverlay();
                    }
                },
                ( error: any ) => {
                    this.alertService.error( 'Failed to load dynamic grid data!', false );
                    this.updateGridState( DynGridLoadStatesEnum.ERROR, initializing );
                    this.onErrorLoading.emit();
                    if ( showOverlay ) {
                        this.overLayService.removeOverlay();
                    }
                }
            );
    }

    public updateGridState( toState: DynGridLoadStatesEnum, initializing: boolean ): void {
        if ( initializing ) {
            this.gridLoadState = toState;
        }
        this.loadingData = toState === DynGridLoadStatesEnum.LOADING;
    }

    public refreshGrid( dynGridProps?: DynGridProperties ): void {
        if ( dynGridProps ) {
            this.dynGridProps = dynGridProps;
        }
        this.fetchData( false );
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
        this.fetchData( false );
        return pageEvent;
    }

    public openDialog(): boolean {
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

    public onClickGridActionCell( cellRow: any, actionHeader: HunterTableConfig ): void {
        if ( !this.loadingData ) {
            const cellActionBean: CellActionBean = new CellActionBean();
            cellActionBean.cellRow = cellRow;
            cellActionBean.actionHeader = actionHeader;
            this.onClickActionCell.emit( cellActionBean );
        }
    }

    public gridBarActionClicked( dynGridBarAction: DynGridBarAction ): void {
        this.onClickGridBarAction.emit( dynGridBarAction );
    }

    public sortInputChanged( sort: Sort ) {
        let orderyBy: GridFieldUserInput[] = this.dynGridProps.defaDynGridDataReq.orderBy;
        orderyBy = HunterUtil.isNotEmpty( orderyBy ) ? orderyBy : [];
        if ( HunterUtil.isNotEmpty( orderyBy ) ) {
            if ( !HunterUtil.strHasVal( sort.direction )) {
                this.removeOrderBy( sort.active );
                this.fetchData( false );
                return;
            }
            this.logger.log( 'Before modifying >>>>> ' + JSON.stringify(  this.dynGridProps.defaDynGridDataReq.orderBy ) );
            const existing: GridFieldUserInput[] = this.dynGridProps.defaDynGridDataReq.orderBy;
            let filtered: GridFieldUserInput[] = JSON.parse(JSON.stringify(existing));
            filtered = filtered.filter( (o: GridFieldUserInput ) => o.fieldName === sort.active );
            if ( HunterUtil.isNotEmpty( filtered ) ) {
                filtered.forEach( (o: GridFieldUserInput ) => {
                    const direction: any = this.getDirection( sort );
                    o.dir = direction;
                });
                existing.forEach( (o: GridFieldUserInput ) => {
                    if ( o.fieldName === sort.active ) {
                        o.dir = this.getDirection( sort );
                    }
                });
                this.logger.log( 'After modifying >>>>> ' + JSON.stringify(  this.dynGridProps.defaDynGridDataReq.orderBy ) );
            } else {
                this.addOrderBy( this.getDirection( sort ), sort.active );
            }
        } else {
            const direction: any = this.getDirection( sort );
            this.dynGridProps.defaDynGridDataReq.orderBy = [];
            this.logger.log( 'After adding >>>>> ' + JSON.stringify(  this.dynGridProps.defaDynGridDataReq.orderBy ) );
            if ( direction !== undefined ) {
                const oBy: GridFieldUserInput = new GridFieldUserInput();
                oBy.dir = direction;
                oBy.fieldName = sort.active;
                this.dynGridProps.defaDynGridDataReq.orderBy.push( oBy );
            }
            this.logger.log( 'After adding >>>>> ' + JSON.stringify(  this.dynGridProps.defaDynGridDataReq.orderBy ) );
        }
        this.logger.log( 'Fetching data with order by: ' + JSON.stringify(  this.dynGridProps.defaDynGridDataReq.orderBy ) );
        this.fetchData( false );
    }

    public openFilter( header: HunterTableConfig, event: MouseEvent ): void {
        if ( !header.isCurrFilter ) {
            this.currFilterHeader = this.currFilterHeader === header ? undefined : header;
            this.filterX = event.x - ( this.filterWidth / 2 );
            this.filterY = event.y;
            this.showFilter = header === this.currFilterHeader;
            this.setIsCurrFilter( true, header.headerId, header );
        } else {
            this.setIsCurrFilter( false, header.headerId, header );
            if ( this.showFilter ) {
                this.clearFilter( true );
            } else {
                if ( HunterUtil.isNotEmpty( this.dynGridProps.defaDynGridDataReq.filterBy ) ) {
                    let filtered: GridFieldUserInput[] = this.dynGridProps.defaDynGridDataReq.filterBy;
                    filtered = filtered.filter( (f: GridFieldUserInput ) => f.fieldName !== header.headerId );
                    this.dynGridProps.defaDynGridDataReq.filterBy = HunterUtil.isNotEmpty( filtered ) ? filtered : [];
                }
            }
        }
        this.fetchData( false );
    }

    public operateFilter(): void {

        const value: any = this.filterFormGroup.value;
        const fieldName: string = this.currFilterHeader.headerId;
        const userInput: string = value['userInput'];
        const operation: OperationEnum = value['operation'] as OperationEnum;

        this.currFilterHeader.isCurrFilter = true;
        this.clearFilter( false );

        if ( !HunterUtil.isNotEmpty( this.dynGridProps.defaDynGridDataReq.filterBy ) ) {
            this.dynGridProps.defaDynGridDataReq.filterBy = [];
        }

        const filterBy: GridFieldUserInput[] = this.dynGridProps.defaDynGridDataReq.filterBy;
        const existing = filterBy.filter( (f: GridFieldUserInput ) => f.fieldName === fieldName );

        const filterInput: GridFieldUserInput = new GridFieldUserInput();
        filterInput.fieldName = fieldName;
        filterInput.operation = operation;
        filterInput.userInput = userInput;

        if ( HunterUtil.isNotEmpty( existing ) ) {
            this.logger.log( 'Before Modifying filter >>>>> ' + JSON.stringify( this.dynGridProps.defaDynGridDataReq.filterBy ) );
            filterBy.forEach( (f: GridFieldUserInput ) => {
                if ( f.fieldName === fieldName ) {
                    f.fieldName = filterInput.fieldName;
                    f.operation = filterInput.operation;
                    f.userInput = filterInput.userInput;
                }
            });
            this.logger.log( 'After Modifying filter >>>>> ' + JSON.stringify( this.dynGridProps.defaDynGridDataReq.filterBy ) );
        } else {
            this.logger.log( 'Before adding filter >>>>> ' + JSON.stringify( this.dynGridProps.defaDynGridDataReq.filterBy ) );
            this.dynGridProps.defaDynGridDataReq.filterBy.push( filterInput );
            this.logger.log( 'After adding filter >>>>> ' + JSON.stringify( this.dynGridProps.defaDynGridDataReq.filterBy ) );
        }
        this.fetchData( false );
    }

    public clearFilter( remove: boolean ) {
        if ( remove ) {
            this.removeCurrFilterFromProps();
        }
        this.showFilter = false;
        this.currFilterHeader = undefined;
        this.filterFormGroup.reset();
        this.filterFormGroup.markAsUntouched();
    }

    public cancelFilter() {
        this.setIsCurrFilter( false, this.currFilterHeader.headerId, this.currFilterHeader );
        this.clearFilter( true );
    }

    public removeCurrFilterFromProps() {
        const proceed: boolean = this.currFilterHeader != null && HunterUtil.isNotEmpty( this.dynGridProps.defaDynGridDataReq.filterBy );
        if ( proceed ) {
            this.setIsCurrFilter( false, this.currFilterHeader.headerId, this.currFilterHeader );
            const indices: number[] = [];
            if ( HunterUtil.isNotEmpty( this.dynGridProps.defaDynGridDataReq.filterBy ) ) {
                this.dynGridProps.defaDynGridDataReq.filterBy.forEach( (f: GridFieldUserInput, i: number) => {
                    if ( f.fieldName === this.currFilterHeader.headerId ) {
                        indices.push( i );
                    }
                });
                if ( HunterUtil.isNotEmpty( indices ) ) {
                    indices.sort( (a: number, b: number) => a - b );
                    indices.forEach( (i: number) => this.dynGridProps.defaDynGridDataReq.filterBy.slice( i, 1 ) );
                }
            }
        }
    }

    private setIsCurrFilter( isCurrFilter: boolean, headerId: string, header: HunterTableConfig ): void {
        this.gridData.headers.forEach( (h: HunterTableConfig ) => {
            if ( h.headerId === headerId ) {
                h.isCurrFilter = isCurrFilter;
                header.isCurrFilter = isCurrFilter;
            }
        });
    }

    private createFilterOperations(): void {
        const operations: SelectValue[] = [
            { text: 'Is equal to', value: OperationEnum.EQUALS },
            { text: 'Is not equal to', value: OperationEnum.NOTEQUALS },
            { text: 'Contains', value: OperationEnum.CONTAINS },
            { text: 'Does not contain', value: OperationEnum.NOTCONTAINS },
            { text: 'Begins with', value: OperationEnum.BEGINS },
            { text: 'Ends with', value: OperationEnum.ENDS },
            { text: 'Is null', value: OperationEnum.ISNOTNULL },
            { text: 'Is not ull', value: OperationEnum.ISNOTNULL },
            { text: 'Is empty', value: OperationEnum.EMPTY },
            { text: 'Is not empty', value: OperationEnum.ISNOTEMPTY }
        ];
        this.filterOperations = operations;
    }

    private createFilterForm(): void {
        this.filterFormGroup = this.formBuilder.group({
            userInput: [ undefined, Validators.required ],
            operation: [ undefined, Validators.required ]
        });
    }

    private addOrderBy( direction: 'asc' | 'desc' | undefined, fieldName: string ): void {
        this.logger.log( 'Before adding >>>>> ' + JSON.stringify( this.dynGridProps.defaDynGridDataReq.orderBy ) );
        const oBy: GridFieldUserInput = new GridFieldUserInput();
        oBy.dir = direction;
        oBy.fieldName = fieldName;
        this.dynGridProps.defaDynGridDataReq.orderBy.push( oBy );
        this.logger.log( 'After adding >>>>> ' + JSON.stringify( this.dynGridProps.defaDynGridDataReq.orderBy ) );
    }

    private removeOrderBy( fieldName: string ): void {
        this.logger.log( 'Before removing >>>>> ' + JSON.stringify( this.dynGridProps.defaDynGridDataReq.orderBy ) );
        const orderyBy: GridFieldUserInput[] = this.dynGridProps.defaDynGridDataReq.orderBy;
        this.dynGridProps.defaDynGridDataReq.orderBy = orderyBy.filter( (o: GridFieldUserInput ) => o.fieldName !== fieldName );
        this.logger.log( 'After removing >>>>> ' + JSON.stringify(  this.dynGridProps.defaDynGridDataReq.orderBy ) );
    }

    private getDirection( sort: Sort ): 'asc' | 'desc' | undefined {
        switch (sort.direction) {
            case 'asc':
                return 'asc'
            case 'desc':
                return 'desc'
            default:
                return undefined;
        }
    }


}
