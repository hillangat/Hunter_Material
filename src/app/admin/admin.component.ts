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

@Component({
    moduleId: module.id,
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    @ViewChild( MatSelectionList ) cacheOptions: MatSelectionList;

    public availCaches: CacheRefresh[];
    public gridState: States = States.LOADING;

    constructor(
        private adminService: AdminService,
        private logger: LoggerService,
        private alertService: AlertService
    ) {}

    public refreshSelCaches() {
        const selected: CacheRefresh[] = this.availCaches.filter( (a: CacheRefresh) => a.selected );
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

}

