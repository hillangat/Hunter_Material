import { filter } from 'RXJS/operators';
import { Observable } from 'RXJS';
import { HunterUtil } from './../../shared/utils/hunter-util';
import { RegionHierarchy } from './../../shared/beans/region-hierarchy';
import { AlertService } from 'app/shared/services/alert.service';
import { HunterServerResponse } from './../../shared/beans/ServerResponse';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HunterConstants } from '../../shared/constants/HunterConstants';

@Injectable()
export class ReceiverRegionService {

    public static regionHierarchiesMap: Map<String, RegionHierarchy[]> = new Map<String, RegionHierarchy[]>();

    public static readonly countryLevel = 'Country';
    public static readonly countyLevel = 'County';
    public static readonly constituencyLevel = 'Constituency';
    public static readonly wadeLevel = 'Ward';

    public readonly regionBaseURL: string = HunterConstants.HUNTER_BASE_URL + 'region/';
    public readonly getRegionHierarchiesURL: string = this.regionBaseURL + 'action/regions/hierarchies/action/read/get/FORWARD/';

    constructor( private http: Http, private alertService: AlertService ) {
        this.getAllRegionHierarchies( 'Kenya' );
    }

    public getHiearchiesForLevelAndParent(
        countryName: string, levelType: string, parent: number,
        regionHiearchies: RegionHierarchy[]
    ): RegionHierarchy[] {
        return (
            regionHiearchies
            .filter( (r: RegionHierarchy) => r.levelType === levelType && r.genParent === parent )
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
                    ReceiverRegionService.regionHierarchiesMap.set( countryName, hiearachies );
                    return ReceiverRegionService.regionHierarchiesMap.get( countryName );
                })
        );
    }

    public getCountiesForCountry( countryId: number, countryName: string ): Observable<RegionHierarchy[]> {
        const baseHiearchies: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
        if ( HunterUtil.isNotEmpty( baseHiearchies ) ) {
            return Observable.of(
                this.getHiearchiesForLevelAndParent( countryName, ReceiverRegionService.countyLevel, countryId, baseHiearchies )
            );
        } else {
            return (
                this.getAllRegionHierarchies( countryName )
                    .map( ( regionHierarchies: RegionHierarchy[] ) => {
                        const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
                        return this.getHiearchiesForLevelAndParent(
                            countryName, ReceiverRegionService.countyLevel, countryId, h );
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
            return Observable.of(
                this.getHiearchiesForLevelAndParent( countryName, ReceiverRegionService.constituencyLevel, county.id, baseHiearchies )
            );
        } else {
            return (
                this.getAllRegionHierarchies( countryName )
                    .map( ( regionHierarchies: RegionHierarchy[] ) => {
                        const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
                        const county: RegionHierarchy = h.find( (r: RegionHierarchy) => {
                            return r.levelType === ReceiverRegionService.countyLevel && r.beanId === countyId;
                        });
                        return this.getHiearchiesForLevelAndParent(
                            countryName, ReceiverRegionService.constituencyLevel, county.id, h );
                    })
            );
        }
    }

    public getWardsForConstituency( countryName: string, constituencyId: number ): Observable<RegionHierarchy[]> {
        const baseHiearchies: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
        if ( HunterUtil.isNotEmpty( baseHiearchies ) ) {
            const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
            const cons: RegionHierarchy = h.find( (r: RegionHierarchy) => {
                return r.levelType === ReceiverRegionService.constituencyLevel && r.beanId === constituencyId;
            });
            return Observable.of(
                this.getHiearchiesForLevelAndParent( countryName, ReceiverRegionService.constituencyLevel, cons.id, h )
            );
        } else {
            return (
                this.getAllRegionHierarchies( countryName )
                    .map( ( regionHierarchies: RegionHierarchy[] ) => {
                        const h: RegionHierarchy[] = ReceiverRegionService.regionHierarchiesMap.get( countryName );
                        const cons: RegionHierarchy = h.find( (r: RegionHierarchy) => {
                            return r.levelType === ReceiverRegionService.constituencyLevel && r.beanId === constituencyId;
                        });
                        return this.getHiearchiesForLevelAndParent(
                            countryName, ReceiverRegionService.wadeLevel, cons.id, h );
                    })
            );
        }
    }

}
