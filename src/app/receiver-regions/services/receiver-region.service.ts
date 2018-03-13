import { filter } from 'RXJS/operators';
import { Observable } from 'RXJS';
import { HunterUtil } from './../../shared/utils/hunter-util';
import { RegionHierarchy } from './../../shared/beans/region-hierarchy';
import { AlertService } from 'app/shared/services/alert.service';
import { HunterServerResponse } from './../../shared/beans/ServerResponse';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HunterConstants } from '../../shared/constants/HunterConstants';
import { ServerStatusResponse } from '../../shared/beans/server-status-response';

@Injectable()
export class ReceiverRegionService {

    public static regionHierarchiesMap: Map<String, RegionHierarchy[]> = new Map<String, RegionHierarchy[]>();

    public static readonly countryLevel = 'Country';
    public static readonly countyLevel = 'County';
    public static readonly constituencyLevel = 'Constituency';
    public static readonly wardLevel = 'Ward';

    public readonly regionBaseURL: string = HunterConstants.HUNTER_BASE_URL + 'region/';
    public readonly getRegionHierarchiesURL: string = this.regionBaseURL + 'action/regions/hierarchies/action/read/get/FORWARD/';

    constructor( private http: Http, private alertService: AlertService ) {
        this.getAllRegionHierarchies( 'Kenya' );
    }

    public getHiearchiesForLevelAndParent( cName: string, level: string, parent: number, hrchs: RegionHierarchy[]): RegionHierarchy[] {
        return (
            hrchs
            .filter( (r: RegionHierarchy) => r.levelType === level && r.genParent === parent )
            .sort( (a: RegionHierarchy, b: RegionHierarchy ) => a.id - b.id )
        );
    }

    public getAllRegionHierarchies( countryName: string ): Observable<RegionHierarchy[]> {
        return (
            this.http
                .get( this.getRegionHierarchiesURL + countryName )
                .map( (resp: Response ) => {
                    const response: HunterServerResponse = HunterUtil.alert( resp, this.alertService );
                    const array: any = response && HunterUtil.isNotEmpty( response.data ) ? response.data : [];
                    const hiearachies: RegionHierarchy[] = array as RegionHierarchy[];
                    hiearachies.sort( (a: RegionHierarchy, b: RegionHierarchy) => HunterUtil.compareStr( a.name, b.name ) );
                    ReceiverRegionService.regionHierarchiesMap.set( countryName, hiearachies );
                    return ReceiverRegionService.regionHierarchiesMap.get( countryName );
                })
        );
    }

    public getCountiesForCountry( countryId: number, countryName: string ): Observable<RegionHierarchy[]> {
        const baseHiearchies: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
        if ( HunterUtil.isNotEmpty( baseHiearchies ) ) {
            const hierarchies: RegionHierarchy[] =  this.getHiearchiesForLevelAndParent(
                countryName, ReceiverRegionService.countyLevel, countryId, baseHiearchies );
            return Observable.of( hierarchies );
        } else {
            return (
                this.getAllRegionHierarchies( countryName )
                    .map( ( regionHierarchies: RegionHierarchy[] ) => {
                        const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
                        const hierarchies: RegionHierarchy[] = this.getHiearchiesForLevelAndParent(
                            countryName, ReceiverRegionService.countyLevel, countryId, h );
                        return hierarchies;
                    })
            );
        }
    }

    public getConstituenciesForCounty( countryName: string, countyId: number ): Observable<RegionHierarchy[]> {
        const baseHiearchies: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
        if ( HunterUtil.isNotEmpty( baseHiearchies ) ) {
            const county: RegionHierarchy = baseHiearchies.find( (r: RegionHierarchy) => {
                return r.levelType === ReceiverRegionService.countyLevel && r.beanId === countyId;
            });
            const hierarchies: RegionHierarchy[] =  this.getHiearchiesForLevelAndParent(
                countryName, ReceiverRegionService.constituencyLevel, county.id, baseHiearchies );
            return Observable.of( hierarchies );
        } else {
            return (
                this.getAllRegionHierarchies( countryName )
                    .map( ( regionHierarchies: RegionHierarchy[] ) => {
                        const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
                        const county: RegionHierarchy = h.find( (r: RegionHierarchy) => {
                            return r.levelType === ReceiverRegionService.countyLevel && r.beanId === countyId;
                        });
                        const hierarchies: RegionHierarchy[] = this.getHiearchiesForLevelAndParent(
                            countryName, ReceiverRegionService.constituencyLevel, county.id, h );
                        return hierarchies;
                    })
            );
        }
    }

public updateRegion( region: RegionHierarchy ): Observable<ServerStatusResponse> {
        return (
          this.http
              .post( HunterConstants.REGION_CONTROLLER_URL + 'action/hierarchies/edit', JSON.stringify( region ) )
              .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as ServerStatusResponse)
        );
      }

    public getWardsForConstituency( countryName: string, constituencyId: number ): Observable<RegionHierarchy[]> {
        const baseHiearchies: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
        if ( HunterUtil.isNotEmpty( baseHiearchies ) ) {
            const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
            const cons: RegionHierarchy = h.find( (r: RegionHierarchy) => {
                return r.levelType === ReceiverRegionService.constituencyLevel && r.beanId === constituencyId;
            });
            const hierarchies: RegionHierarchy[] =  this.getHiearchiesForLevelAndParent(
                countryName, ReceiverRegionService.wardLevel, cons.id, h );
            return Observable.of( hierarchies );
        } else {
            return (
                this.getAllRegionHierarchies( countryName )
                    .map( ( regionHierarchies: RegionHierarchy[] ) => {
                        const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
                        const cons: RegionHierarchy = h.find( (r: RegionHierarchy) => {
                            return r.levelType === ReceiverRegionService.constituencyLevel && r.beanId === constituencyId;
                        });
                        const hierarchies: RegionHierarchy[] = this.getHiearchiesForLevelAndParent(
                            countryName, ReceiverRegionService.wardLevel, cons.id, h );
                        console.log( JSON.stringify( h ) );
                        return hierarchies;
                    })
            );
        }
    }

    public getCount( countryName: string, level: string ): number {
        const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
        return h ? h.filter( ( r: RegionHierarchy) => r.levelType === level ).length : 0;
    }

    public refreshAllHierachies( countryName: string ) {
        return this.getAllRegionHierarchies( countryName );
    }

}
