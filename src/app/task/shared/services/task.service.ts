import { DynGridBarAction } from './../../../shared/dynamic-grid/shared/dyn-grid-bar-action';
import { Task } from './../../../shared/beans/Task';
import { HunterConstants } from 'app/shared/constants/HunterConstants';
import { TaskTypeEnum } from './../../../shared/enums/task-type.enum';
import { SelectValue } from './../../../shared/beans/SelectValue';
import { ServerStatusResponse } from './../../../shared/beans/server-status-response';
import { Observable } from 'RXJS';
import { Injectable, OnInit, group } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { LoggerService } from '../../../shared/logger/logger-service';
import { TaskCloneModel } from '../../../shared/beans/clone-task-model';
import { TaskFieldsModel } from '../../../shared/beans/task-field-model';


import 'rxjs/add/operator/map';
import { MessageTypeEnum } from '../../../shared/enums/message-type.enum';
import { AlertService } from 'app/shared/services/alert.service';
import { DynGridProperties } from '../../../shared/dynamic-grid/shared/dyn-grid-properties';
import { DynGridDataReq } from '../../../shared/beans/dyn-grid-data-req';
import { GridFieldUserInput } from '../../../shared/dynamic-grid/shared/grid-field-user-input';
import { HunterUtil } from 'app/shared/utils/hunter-util';
import { TaskMessage } from '../../../shared/beans/TaskMessage';
import { HunterServerResponse } from '../../../shared/beans/ServerResponse';

@Injectable()

export class TaskService {

  public readonly taskBaseURL = 'http://localhost:8080/Hunter/task/';
  public readonly deleteTaskURL = this.taskBaseURL + 'action/task/destroy';
  public readonly cloneTaskURL = this.taskBaseURL + 'action/task/clone';
  public readonly updateTaskFieldsURL = this.taskBaseURL + 'action/updateFields';
  public readonly processTaskURL = this.taskBaseURL + 'action/processTask/';
  public readonly createOrUpdateTaskFieldsURL = this.taskBaseURL + 'action/createOrUpdate';
  public readonly updateTaskStatusURL = this.taskBaseURL + '/action/task/changeStatus';
  public readonly loadTaskForTaskURL = this.taskBaseURL + 'action/task/load/';
  public readonly furnishTaskURL = this.taskBaseURL + 'action/task/furnish/';
  public readonly taskHistoryURL = this.taskBaseURL + 'action/task/history/getForTask/';
  public readonly getAvailTaskGroups = this.taskBaseURL + 'action/task/availGroups/';
  public readonly addGrpToTask = this.taskBaseURL + 'action/tskGrp/create';
  public readonly addRegionToTaskURL = this.taskBaseURL + 'action/regions/addRegion/';
  public readonly currAccessToke = 'YWRtaW46OTk5OTk5';
  public readonly getTasksURL = 'http://localhost:8080/Hunter/restful/tasks/read';
  public readonly getAllTasksURL = this.getTasksURL + '/all';
  public readonly getOneTasksURL = this.getTasksURL + '/';
  public readonly getHistoryURL  = this.taskBaseURL + 'action/task/history/getForTask/';
  public readonly getGroupsURL  = this.taskBaseURL + 'action/task/groups/';
  public readonly removeGroupFromTaskURL  = this.taskBaseURL + 'action/tskGrp/destroy';
  public readonly removeSelTaskRegionsFromTaskURL  = this.taskBaseURL + 'action/regions/removeSelRegionsRegionsFromTask/';
  public readonly getServiceProvidersSelValsURL  = this.taskBaseURL + 'action/providers/selVals/';
  public readonly getTaskRegions  = HunterConstants.HUNTER_BASE_URL + 'region/action/task/regions/read/';
  public readonly createTaskMessageURL = 'message/action/tskMsg/create/';
  public readonly getAngularMessageURL = 'message/action/tskMsg/getAngularMsg/';
  public readonly getAvailGroupsForDynGrid = this.taskBaseURL + 'action/task/availGroupsForDynGrid/';

  constructor( private http: Http, private logger: LoggerService, private alertService: AlertService ) {}

  public addRegionToTask( taskId: number, type: string, regionIds: SelectValue[] ): Observable<HunterServerResponse> {
    return (
      this.http
          .post( this.addRegionToTaskURL + taskId + '/' + type,  regionIds)
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse )
          .catch( (error: any) => {
            this.alertService.error( 'Application error occurred while creating message' )
            return Observable.throw( error );
          })
    );
  }

  public getMessageForTask( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( HunterConstants.HUNTER_BASE_URL + this.getAngularMessageURL + taskId )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse )
          .catch( (error: any) => {
            this.alertService.error( 'Application error occurred while creating message' )
            return Observable.throw( error );
          })
    );
  }

  public createTaskMessage( taskId: number, message: any ): Observable<HunterServerResponse> {
    return (
      this.http
          .post( HunterConstants.HUNTER_BASE_URL + this.createTaskMessageURL + taskId, JSON.stringify(message) )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse )
          .catch( (error: any) => {
            this.alertService.error( 'Application error occurred while creating message' )
            return Observable.throw( error );
          })
    );
  }

  public getServiceProvidersSelVals( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.getServiceProvidersSelValsURL + taskId )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse )
    );
  }

  public getAllTasks(): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.getAllTasksURL )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse )
    );
  }

  public getTaskById( taskId: number ): Observable<Task> {
    return (
      this.http
          .get( this.taskBaseURL + 'getTask/byId/' + taskId )
          .map( (response: Response) => {
            const data: any[] = HunterUtil.getDataOrAlert( response, this.alertService );
            const task: Task = ( data ? data[0] : null ) as Task;
            return task;
          })
    );
  }

  public getClientTasks( clientId: number ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const t = localStorage.getItem('accessToken');
    headers.append('Authorization', 'Basic YWRtaW46OTk5OTk5');
    headers.append('JSESSIONID', 'C0C457A0BCC9CFE8E5273C18C27E451A');
    const body = JSON.stringify(null);

    return this.http.post(this.getTasksURL + clientId, body, { headers: headers })
      .map((response) => {
        const result = HunterUtil.alert( response, this.alertService );
        return result;
      }).subscribe(response => {
        this.logger.log( JSON.stringify( response ) );
      });
  }

  public getAvailTskGrpsForTskId( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.getAvailTaskGroups + taskId )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse)
    );
  }

  public createOrUpdateTask( fieldsModel: TaskFieldsModel ): Observable<HunterServerResponse> {
    return (
      this.http
          .post( this.createOrUpdateTaskFieldsURL, JSON.stringify( fieldsModel ) )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse)
    );
  }

  public updateTaskStatus( taskId: number, toStatus: string ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.updateTaskStatusURL, JSON.stringify( { toStatus: toStatus, taskId: taskId } ) )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as ServerStatusResponse)
    );
  }

  public processTask( taskId: number): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.processTaskURL + taskId , undefined )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as ServerStatusResponse)
    );
  }

  public getTaskLifeStatuses (): Observable<SelectValue[]> {
    const lifeStatuses: SelectValue[] = [];
    lifeStatuses.push ( new SelectValue( 'Draft', 'Draft' ) );
    lifeStatuses.push ( new SelectValue( 'Review', 'Review' ) );
    lifeStatuses.push ( new SelectValue( 'Approved', 'Approved' ) );
    lifeStatuses.push ( new SelectValue( 'Processed', 'Processed' ) );
    return Observable.of( lifeStatuses );
  }

  public getTaskHistoryForTaskId( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.taskHistoryURL + taskId )
          .map( (response: Response) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse)
    );
  }

  public loadTaskForId(taskId: number): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.loadTaskForTaskURL + taskId )
          .map( ( response: Response ) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse )
    );
  }

  public furnishTask(taskId: number): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.furnishTaskURL + taskId )
          .map( ( response: Response ) => HunterUtil.alert( response, this.alertService ) as HunterServerResponse )
    );
  }

  public cloneTask( cloneTask: TaskCloneModel ): Observable<HunterServerResponse> {
    return (
      this.http
          .post( this.cloneTaskURL, JSON.stringify(cloneTask) )
          .map( ( resp: Response) => HunterUtil.alert( resp, this.alertService ) as HunterServerResponse )
    );
  }

  public deleteTask( taskId: number ): Observable<HunterServerResponse> {
    return(
      this.http
          .post( this.deleteTaskURL, JSON.stringify({ taskId: taskId }) )
          .map( (response: Response) => HunterUtil.alert( response , this.alertService ) )
    );
  }

  public removeGroupFromTask( taskId: number, groupId: number ): Observable<HunterServerResponse> {
    return(
      this.http
          .post( this.removeGroupFromTaskURL, JSON.stringify({ taskId: taskId, groupId: groupId }) )
          .map( (response: Response) => HunterUtil.alert( response , this.alertService ) )
    );
  }

  public removeSelRegionsFromTask( taskId: number, selRegions: SelectValue[] ): Observable<HunterServerResponse> {
    return(
      this.http
          .post( this.removeSelTaskRegionsFromTaskURL + taskId, selRegions)
          .map( (response: Response) => HunterUtil.alert( response , this.alertService ) )
    );
  }

  public addGroupToTask( taskId: number, groupIds: number[] ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.addGrpToTask, JSON.stringify({ taskId: taskId, groupIds: groupIds }) )
          .map( ( resp: Response) => HunterUtil.alert( resp , this.alertService ) as ServerStatusResponse )
    );
  }

  public getTaskApprovers(): Observable<SelectValue[]> {
    return (
      this.http
          .get( HunterConstants.TASK_APPROVERS_SEL_URL )
          .map( ( resp: Response) => HunterUtil.getDataOrAlert(resp, this.alertService ) as SelectValue[] )
    );
  }

  public getReadTasksURL(): string {
    return this.loadTaskForTaskURL;
  }

  public getReadTaskGroupsURL( taskId: number ): string {
    return this.getGroupsURL + taskId;
  }

  public getTaskHistoryURL( taskId: number ) {
    return this.getHistoryURL + taskId;
  }

  public getTaskTypes(): Observable<SelectValue[]> {
    const taskTypes: SelectValue[] = [];
    taskTypes.push( new SelectValue( TaskTypeEnum.POLITICAL, TaskTypeEnum.POLITICAL ) );
    taskTypes.push( new SelectValue( TaskTypeEnum.CORPORATE, TaskTypeEnum.CORPORATE ) );
    taskTypes.push( new SelectValue( TaskTypeEnum.EDUCATIONAL, TaskTypeEnum.EDUCATIONAL ) );
    taskTypes.push( new SelectValue( TaskTypeEnum.SOCIAL, TaskTypeEnum.SOCIAL ) );
    taskTypes.push( new SelectValue( TaskTypeEnum.TESTING, TaskTypeEnum.TESTING ) );
    return Observable.of( taskTypes ).delay(500);
  }


  public getMessageTypesSelVals(): Observable<SelectValue[]> {
    const messageTypes: SelectValue[] = [];
    messageTypes.push( new SelectValue( MessageTypeEnum.AUDIO, MessageTypeEnum.AUDIO ) );
    messageTypes.push( new SelectValue( MessageTypeEnum.CALL, MessageTypeEnum.CALL ) );
    messageTypes.push( new SelectValue( MessageTypeEnum.EMAIL, MessageTypeEnum.EMAIL ) );
    messageTypes.push( new SelectValue( MessageTypeEnum.SOCIAL, MessageTypeEnum.SOCIAL ) );
    messageTypes.push( new SelectValue( MessageTypeEnum.TEXT, MessageTypeEnum.TEXT ) );
    messageTypes.push( new SelectValue( MessageTypeEnum.VAOICE_MAIL, MessageTypeEnum.VAOICE_MAIL ) );
    return Observable.of( messageTypes ).delay(500);
  }

  public getGatewayClientsSelVals( messageType: string ) {
    return (
      this.http
          .get( HunterConstants.GATEWAY_CLIENTS_SEL_URL + messageType )
          .map( ( resp: Response) => HunterUtil.getDataOrAlert(resp, this.alertService) as SelectValue[] )
    );
  }

  public getGenericGridDataProps( url: string, reference: string, dynGridBarActions: DynGridBarAction[] ): DynGridProperties {
    const props: DynGridProperties = new DynGridProperties();
    props.filterable = true;
    props.gridDataLoadUrl = url;
    props.pageable = true;
    props.pageSizes = [ 10, 25, 50, 100, 200 ];
    props.pageSize = 10;
    props.pageNo = 1;
    props.dynGridBarActions = dynGridBarActions;
    props.refreshable = true;
    props.maxHeight = 500;
    props.sortable = true;
    props.defaDynGridDataReq = new DynGridDataReq();
    props.defaDynGridDataReq.reference = reference;
    props.defaDynGridDataReq.pageNo = props.pageNo;
    props.defaDynGridDataReq.pageSize = props.pageSize;
    props.defaDynGridDataReq.filterBy = undefined;
    props.defaDynGridDataReq.orderBy = undefined;
    return props;
  }

  public getTaskGridDynGridBarActions(): DynGridBarAction[] {
    const barActions: DynGridBarAction[] = [];
    const createTask: DynGridBarAction = new DynGridBarAction();
    createTask.text = 'Create Task';
    createTask.displayType = HunterConstants.DISPLAY_TYP_BUTTON;
    createTask.icon = 'add';
    createTask.index = 1;
    createTask.key = 'createTask';
    barActions.push( createTask );
    barActions.sort( (a: DynGridBarAction, b: DynGridBarAction) => (a.index - b.index) );
    return barActions;
  }


}
