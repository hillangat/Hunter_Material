import { DynGridLoadStatesEnum } from './enums/dyn-grid-load-states.enum';
import { Component, OnDestroy, EventEmitter } from '@angular/core';
import DynGridHelper from './shared/dyn-grid-helper';
import { Input, Output, OnInit } from '@angular/core';
import { DynGridProperties } from './shared/dyn-grid-properties';
import { DynGridService } from './services/dyn-grid.service/dyn-grid.service';
import { HunterServerResponse } from '../beans/ServerResponse';
import { LoggerService } from '../logger/logger-service';

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

    public filterValue = '';

    private gridLoadState: DynGridLoadStatesEnum = DynGridLoadStatesEnum.LOADING;
    private gridData: HunterServerResponse;

    public constructor( private logger: LoggerService, private dynGridService: DynGridService ) { }

    public ngOnInit(): void {
        this.logger.log( 'Initializing grid data: ' + JSON.stringify( this.dynGridProps ) );
        this.fetchData();
    }

    public fetchData(): void {
        this.gridLoadState = DynGridLoadStatesEnum.LOADING;
        this.dynGridProps = this.dynGridService.getSampleDefGridDataProps( this.filterValue );
        this.dynGridService
            .getGridData( this.dynGridProps.gridDataLoadUrl, this.dynGridProps.defaDynGridDataReq )
            .subscribe(
                ( gridData: HunterServerResponse ) => {
                    this.gridData = gridData;
                    this.gridLoadState = DynGridLoadStatesEnum.SUCCESS;
                    this.onSuccessLoading.emit();
                },
                ( error: any ) => {
                    this.gridLoadState = DynGridLoadStatesEnum.ERROR;
                    this.onErrorLoading.emit();
                }
            );
    }

    public refreshGrid( dynGridProps: DynGridProperties ): void {
        if ( dynGridProps ) {
            this.dynGridProps = dynGridProps;
        }
        this.fetchData();
    }

    public ngOnDestroy(): void {}

}
