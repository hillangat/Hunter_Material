import { DynGridDataReq } from './../../../beans/dyn-grid-data-req';
import { LoggerService } from './../../../logger/logger-service';
import { HunterUtil } from './../../../utils/hunter-util';
import { Observable } from 'RXJS';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { HunterServerResponse } from '../../../beans/ServerResponse';
import { ServerStatusResponse } from '../../../beans/server-status-response';
import { DynGridProperties } from '../../shared/dyn-grid-properties';
import { GridFieldUserInput } from '../../shared/grid-field-user-input';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DynGridService {

  constructor( private httpClient: Http, private logger: LoggerService ) { }

  public addGridRow( url: string, rowBean: any ): Observable<ServerStatusResponse> {
    this.logger.log( 'Adding grid data: ' + url + ', \n' + JSON.stringify( rowBean ) );
    return (
      this.httpClient
          .post( url, JSON.stringify( rowBean ) )
          .map( (response: Response) => response.json() as ServerStatusResponse )
          .catch( (error: any) => HunterUtil.handleError( error, 'adding grid row: ' + url ) )
    );
  }

  public getGridData( url: string, dynGridDataReq: DynGridDataReq ): Observable<HunterServerResponse> {
    return (
      this.httpClient
          .post( url, JSON.stringify( dynGridDataReq ) )
          .map( (response: Response) => response.json() as HunterServerResponse )
          .catch( (error: any) => HunterUtil.handleError( error, 'getting grid data: ' + url ) )
    );
  }

  public updateGridRow( url: string, rowBean: any ): Observable<ServerStatusResponse> {
    return (
      this.httpClient
          .post( url, JSON.stringify( rowBean ) )
          .map( (response: Response) => response.json() as ServerStatusResponse )
          .catch( (error: any) => HunterUtil.handleError( error, 'updating grid row: ' + url ) )
    );
  }

  public deleteGridRow( url: string ): Observable<ServerStatusResponse> {
    return (
      this.httpClient
          .delete( url )
          .map( (response: Response) => response.json() as ServerStatusResponse )
          .catch( (error: any) => HunterUtil.handleError( error, 'deleting grid row: ' + url ) )
    );
  }

  public getSampleDefGridDataProps( filterValue: string ): DynGridProperties {

    const props: DynGridProperties = new DynGridProperties();
    props.addable =  true;
    props.filterable = true;
    props.gridDataLoadUrl = 'http://localhost:8080/Hunter/restful/tasks/read/all';
    props.pageable = true;
    props.pageNumber = 0;
    props.pageSize = 10;
    props.refreshable = true;
    props.sortable = true;

    props.defaDynGridDataReq = new DynGridDataReq();
    props.defaDynGridDataReq.reference = 'TASK_GRID';
    props.defaDynGridDataReq.filterBy = [
      { fieldName: 'taskId', userInput: '100', dir: 'asc', operation: 'lt' } as GridFieldUserInput,
      { fieldName: 'taskName', userInput: filterValue, dir: 'asc', operation: 'contains' } as GridFieldUserInput
    ];
    props.defaDynGridDataReq.orderBy = [
      { fieldName: 'taskId', userInput: undefined, dir: 'asc', operation: undefined } as GridFieldUserInput
    ];
    props.defaDynGridDataReq.pageSize = 10;
    props.defaDynGridDataReq.pageNo = 0;
    return props;
  }

}
