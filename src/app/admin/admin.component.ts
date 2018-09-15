import { SelectValue } from './../shared/beans/SelectValue';
import { HunterUtil } from './../shared/utils/hunter-util';
import { SelectionModel } from '@angular/cdk/collections';
import { LoggerService } from 'app/shared/logger/logger-service';
import { CacheRefresh, CacheKeysEnum } from './shared/beans/cache-refresh';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewChild } from '@angular/core';
import { AdminService } from './shared/services/admin.service';
import { MatSelectionList, MatListOption, MatSelectionListChange } from '@angular/material';
import { ServerStatusResponse } from 'app/shared/beans/server-status-response';
import { States } from 'app/shared/enums/states.enum';
import { AlertService } from '../shared/services/alert.service';
import { Dropdown } from '../shared/hunter-combobox/shared/hunter-combobox-input';
import { HunterComboboxComponent } from '../shared/hunter-combobox/hunter-combobox.component';
import { ReceiverRegionService } from '../receiver-regions/services/receiver-region.service';

@Component({
    moduleId: module.id,
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    @ViewChild( MatSelectionList ) cacheOptions: MatSelectionList;

    public availCaches: CacheRefresh[];
    @ViewChild('regionCombobox') public regionCombobox: HunterComboboxComponent;
    public gridState: States = States.LOADING;

    constructor(
        private adminService: AdminService,
        private logger: LoggerService,
        private alertService: AlertService,
        private regionService: ReceiverRegionService
    ) {}

    public refreshSelCaches() {
        const selected: CacheRefresh[] = this.availCaches.filter( (a: CacheRefresh) => a.selected );
        if ( !HunterUtil.isNotEmpty( selected ) ) {
            this.alertService.warn( 'Please select at least on cache to refresh', false );
            return;
        }
        this.setRefreshing( selected, true );
        this.adminService
            .refreshCaches( selected )
            .subscribe(
                ( statusResp: ServerStatusResponse ) => {
                    this.alertService.success( 'Successfully refreshed selected cache(s)' );
                    this.setRefreshing( selected, false );
                    this.logger.log( statusResp.message );
                    this.availCaches.forEach( (a: CacheRefresh) => a.selected = false );
                },
                ( error: any ) => {
                    this.alertService.error( 'An error occurred while trying to refresh cache' );
                    this.setRefreshing( selected, false );
                    this.logger.log( 'Error!!' + JSON.stringify( error ) );
                }
            );
    }


    public setRefreshing( selected: CacheRefresh[], refreshing: boolean ): void {
        selected.forEach( (s: CacheRefresh) => s.refreshing = refreshing );
    }

    public ngOnInit() {
        this.getAvailCaches();
        this.logger.log( JSON.stringify( this.availCaches ) );
    }

    public onSelCache( c: CacheRefresh ) {
        if ( this.availCaches.filter( (a: CacheRefresh) => a.refreshing ).length > 0 ) {
            return;
        }
        c.selected = !c.selected;
        if ( c.key === CacheKeysEnum.ALL ) {
            this.availCaches.forEach( (cr: CacheRefresh) => cr.selected = c.selected && !c.refreshing );
        } else {
            let selAll = true;
            let all: CacheRefresh;
            this.availCaches
                .forEach( (cr: CacheRefresh) => {
                    if ( cr.key === CacheKeysEnum.ALL ) {
                        all = cr;
                    } else {
                        selAll = selAll ? cr.selected : selAll;
                    }
                });
            all.selected = selAll && !all.refreshing;
        }
    }

    public getAvailCaches(): void {
        this.gridState = States.LOADING;
        this.availCaches = [];
        this.adminService
            .getAvailCaches()
            .subscribe(
                ( cashes: CacheRefresh[] ) => {
                    this.alertService.success( 'Successfully loaded cache records!' );
                    this.availCaches = cashes;
                    this.logger.log( JSON.stringify(this.availCaches) );
                    this.gridState = States.SUCCESS;
                } ,
                ( error: any ) => {
                    const message = 'Error occurred loading available cache refreshes: ';
                    this.alertService.error( message );
                    this.logger.log( message + JSON.stringify( JSON.stringify(error) ) );
                    this.gridState = States.ERROR_OCCURRED;
                }
            );
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

}

