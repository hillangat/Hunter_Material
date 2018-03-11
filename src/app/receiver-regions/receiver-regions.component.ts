import { ServerStatusResponse } from './../shared/beans/server-status-response';
import { HunterUtil } from 'app/shared/utils/hunter-util';
import { Observable } from 'RXJS';
import { Router, NavigationEnd } from '@angular/router';
import { ReceiverRegionService } from './services/receiver-region.service';
import { RegionHierarchy } from './../shared/beans/region-hierarchy';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';
import { CellActionBean } from '../shared/beans/cell-action-bean';
import { MatDialog } from '@angular/material';
import { ConfirmGridActionComponent } from '../shared/confirm-grid-action/confirm-grid-action.component';
import { EditRegionComponent } from './shared/edit-region/edit-region.component';
import { HunterTableConfig } from '../shared/beans/hunter-table-configs';
import { OverlayService } from '../shared/overlay/shared/overlay.service';
import { LoggerService } from '../shared/logger/logger-service';

@Component({
    moduleId: module.id,
    selector: 'app-receiver-regions',
    templateUrl: 'receiver-regions.component.html',
    styleUrls: ['receiver-regions.component.scss']
})
export class ReceiverRegionsComponent implements OnInit {

    public baseHierarchies: RegionHierarchy[] = [];
    public allExpanded = false;

    public names: {first: string, last: string}[] = [
        { first: 'Kip 1', last: 'Kip 1' },
        { first: 'Kip 2', last: 'Kip 2' },
        { first: 'Kip 3', last: 'Kip 3' },
        { first: 'Kip 4', last: 'Kip 4' },
        { first: 'Kip 5', last: 'Kip 5' }
    ];

    constructor(
        private regionService: ReceiverRegionService,
        private router: Router,
        private alertService: AlertService,
        private dialog: MatDialog,
        private overlayService: OverlayService,
        private logger: LoggerService
    ) {  }

    public ngOnInit() {
      this.loadRegions();
    }

    public loadRegions(): void {
        this.regionService
            .getCountiesForCountry( 1, 'Kenya' )
            .subscribe( (rs: RegionHierarchy[] ) => {
                this.baseHierarchies = rs
            });
    }

    public listenToRouteChanges(): void {
        this.router.events.filter( (e: any) => e instanceof NavigationEnd ).subscribe( (e) => this.loadRegions() );
    }

    public getWardsCount(): number {
        return this.regionService.getCount( 'Kenya', ReceiverRegionService.wardLevel );
    }

    public loadChildrenFor( region: RegionHierarchy, expandAll?: boolean ): void {
        if ( region.expanded && !expandAll || region.levelType === ReceiverRegionService.wardLevel ) {
            region.expanded = false;
            region.children = [];
        } else {
            this.getRegionObs( region.beanId, 'Kenya', region.levelType )
                .subscribe( (r: RegionHierarchy[]) => {
                    region.expanded = !region.expanded;
                    region.children = r;
                    if ( expandAll && region.levelType !== 'Ward' ) {
                        region.children.forEach( (h: RegionHierarchy) => this.loadChildrenFor( h, true ) )
                    }
                });
        }
    }

    public getRegionObs( beanId: number, name: string, levelType: string ): Observable<RegionHierarchy[]> {
        switch (levelType) {
            case ReceiverRegionService.countryLevel: return this.regionService.getCountiesForCountry( beanId, name );
            case ReceiverRegionService.countyLevel: return this.regionService.getConstituenciesForCounty( name, beanId  );
            case ReceiverRegionService.constituencyLevel: return this.regionService.getWardsForConstituency( name, beanId );
            default: Observable.of([]);
        }
    }

    public getMarginLeft( levelType: string ): number {
        switch ( levelType ) {
            case 'County': return 0;
            case 'Constituency': return 10;
            case 'Ward': return 20;
            default: return 0;
        }
      }

      public formatDate( date: number ): string {
        return HunterUtil.getFormatedDate( new Date( date ) );
      }

    public getCellClass( region: RegionHierarchy, actionBtton?: boolean ) {
        let currClass: string = null;
        switch ( region.levelType ) {
            case ReceiverRegionService.constituencyLevel: currClass = 'consCell';
            break;
            case ReceiverRegionService.wardLevel: currClass = 'wardCell';
            break;
            default: currClass = '';
        }
        if ( region.levelType === ReceiverRegionService.constituencyLevel && region.expanded ) {
            currClass = currClass + ' consBorderBottom'
        }
        if ( actionBtton ) {
            currClass = currClass + ' actionCol'
        }
        return currClass;
    }

    public performAction( region: RegionHierarchy, action: string ) {
        if ( action === 'EDIT' ) {
            this.showEdit( region, action );
        } else if ( action === 'DELETE' ) {
            this.confirmDelete( region, action );
        }
    }

    public expandAll() {
        this.baseHierarchies.forEach( (b: RegionHierarchy) => this.loadChildrenFor( b, true ) );
        this.allExpanded = true;
    }

    public collapseAll() {
        this.allExpanded = false;
        this.baseHierarchies.forEach( (b: RegionHierarchy) => {
            b.expanded = false;
            const children: RegionHierarchy[] = b.children;
            if ( HunterUtil.isNotEmpty( children ) ) {
                children.forEach( (c: RegionHierarchy) => {
                    c.expanded = false;
                    const granChildren: RegionHierarchy[] = c.children;
                    if ( HunterUtil.isNotEmpty( granChildren ) ) {
                        granChildren.forEach( (ch: RegionHierarchy) => {
                            ch.expanded = false;
                            ch.children = [];
                        });
                    }
                    c.children = [];
                })
            }
            b.children = [];
        });
    }

    public confirmDelete( region: RegionHierarchy, action: string ): void {
        const cellAction = new CellActionBean();
        cellAction.message = 'The selected region ( ' + region.levelType + ': ' + region.name +
        ' ) and its children will be deleted. Are you sure?';
        cellAction.notIconName = 'do_not_disturb';
        cellAction.yesIconName = 'clear';
        cellAction.title = 'Delete Receiver Region';
        cellAction.titleIcon = 'clear';
        cellAction.yesButtonText = 'Delete';
        cellAction.noButtonText = 'Close';
        cellAction.entryValues = region;
        cellAction.actionHeader = new HunterTableConfig();
        cellAction.actionHeader.dataId = 'DELETE';
        this.openDialog(cellAction, action);
    }

    public showEdit( region: RegionHierarchy, action: string ): void {
        const cellAction = new CellActionBean();
        cellAction.title = 'Edit Receiver Region';
        cellAction.titleIcon = 'clear';
        cellAction.yesIconName = 'done';
        cellAction.notIconName = 'do_not_disturb';
        cellAction.yesButtonText = 'Save Changes';
        cellAction.noButtonText = 'Close';
        cellAction.actionHeader = new HunterTableConfig();
        cellAction.actionHeader.dataId = 'EDIT';
        cellAction.cellRow = region;
        this.openDialog(cellAction, action);
    }

    public openDialog( cellAction: CellActionBean, action: string ): boolean {
        const typ: any = action === 'DELETE' ? ConfirmGridActionComponent : EditRegionComponent;
        const dialogRef = this.dialog.open(typ, {
          width: action === 'DELETE' ? '450px' : '600px',
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
        if ( cellAction.actionHeader.dataId === 'DELETE' ) {
            this.alertService.warn( 'Regions cannot be deleted at the moment.' );
        } else {
            const vals: { name: string, population: number, regionCode: string } = cellAction.entryValues;
            let region: RegionHierarchy = cellAction.cellRow;
            region = JSON.parse( JSON.stringify(region) ) as RegionHierarchy;
            region = Object.assign( region, vals );
            this.overlayService.openOverlay( true, 'Saving changes...' );
            this.regionService
                .updateRegion( region )
                .subscribe(
                    (s: ServerStatusResponse) => this.logger.log(
                        'Saved region changes: status = ' + s.status  + ', message = ' + s.message ),
                    ( error: any ) => this.logger.log( 'Error saving region changes >> ' + JSON.stringify( error ) ),
                    () => {
                        this.reloadAllHieararchiesAndRemoveOverlay();
                    }
            );
        }
    }

    public reloadAllHieararchiesAndRemoveOverlay() {
        this.regionService
            .refreshAllHierachies( 'Kenya' )
            .subscribe(
                (r: RegionHierarchy[]) => this.loadRegions(),
                ( error: any ) => this.logger.error( JSON.stringify( error ) ),
                () => this.overlayService.removeOverlay()
        );
    }

}
