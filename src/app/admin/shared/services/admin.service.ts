import { ServerStatusResponse } from './../../../shared/beans/server-status-response';
import { availCaches, CacheRefresh } from './../beans/cache-refresh';
import { Injectable } from '@angular/core';
import { Observable } from 'RXJS';
import { Http, Response } from '@angular/http';
import { HunterConstants } from '../../../shared/constants/HunterConstants';
import { HunterUtil } from '../../../shared/utils/hunter-util';


@Injectable()
export class AdminService {

    constructor( private http: Http ) {}

    public refreshCaches( caches: CacheRefresh[] ): Observable<ServerStatusResponse> {
        return (
            this.http
                .post( HunterConstants.REFRESH_CACHE_URL, JSON.stringify( caches ) )
                .map( ( response: Response ) => response.json() as ServerStatusResponse )
                .catch( (e: any) => {
                    HunterUtil.handleError( e, 'Error occurred while loading cach refresh' );
                    return Observable.throw( e );
                })
        );
    }

    public getAvailCaches(): Observable<CacheRefresh[] | ServerStatusResponse> {
        // return Observable.of( availCaches ).delay( 500 );
        return (
            this.http
                .get( HunterConstants.CACHE_REFRESH_URL )
                .map( ( response: Response ) => {
                    const json: any = response.json();
                    if ( HunterUtil.isStatusResp( json ) ) {
                        return Observable.throw( json as ServerStatusResponse );
                    } else {
                        return json as CacheRefresh[];
                    }
                })
                .catch( (e: any) => {
                    HunterUtil.handleError( e, 'Error occurred while getting cach refresh records' );
                    return Observable.throw( e );
                })
        );
    }

}
