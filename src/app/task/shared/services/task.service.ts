import { HunterUtil } from './../../../shared/utils/hunter-util';
import { HunterConstants } from 'app/shared/constants/HunterConstants';
import { TaskTypeEnum } from './../../../shared/enums/task-type.enum';
import { SelectValue } from './../../../shared/beans/SelectValue';
import { ServerStatusResponse } from './../../../shared/beans/server-status-response';
import { Observable } from 'RXJS';
import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { LoggerService } from '../../../shared/logger/logger-service';
import { TaskCloneModel } from '../../../shared/beans/clone-task-model';
import { HunterServerResponse } from '../../../shared/beans/ServerResponse';
import { TaskFieldsModel } from '../../../shared/beans/task-field-model';


import 'rxjs/add/operator/map';
import { MessageTypeEnum } from '../../../shared/enums/message-type.enum';

@Injectable()

export class TaskService {

  private taskBaseURL = 'http://localhost:8080/Hunter/task/';
  private deleteTaskURL = this.taskBaseURL + 'action/task/destroy';
  private cloneTaskURL = this.taskBaseURL + 'action/task/clone';
  private updateTaskFieldsURL = this.taskBaseURL + 'action/updateFields';
  private createOrUpdateTaskFieldsURL = this.taskBaseURL + 'action/createOrUpdate';
  private loadTaskForTaskURL = this.taskBaseURL + 'action/task/load/';
  private furnishTaskURL = this.taskBaseURL + 'action/task/furnish/';
  private taskHistoryURL = this.taskBaseURL + 'action/task/history/getForTask/';
  private getAvailTaskGroups = this.taskBaseURL + 'action/task/availGroups/';
  private addGrpToTask = this.taskBaseURL + 'action/tskGrp/create';
  private currAccessToke = 'YWRtaW46OTk5OTk5';
  private getTasksURL = 'http://localhost:8080/Hunter/restful/tasks/read';
  private getAllTasksURL = this.getTasksURL + '/all';

  constructor( private http: Http, private logger: LoggerService ) {}

  public getAllTasks(): Observable<HunterServerResponse> {
    return  this.http
                .get( this.getAllTasksURL )
                .map( (response: Response) => HunterUtil.alert( response ) as HunterServerResponse );
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
        const result = HunterUtil.alert( response );
        return result;
      }).subscribe(response => {
        this.logger.log( response );
      });
  }

  public getAvailTskGrpsForTskId( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.getAvailTaskGroups + taskId )
          .map( (response: Response) => HunterUtil.alert( response ) as HunterServerResponse)
    );
  }

  public createOrUpdateTask( fieldsModel: TaskFieldsModel ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.createOrUpdateTaskFieldsURL, JSON.stringify( fieldsModel ) )
          .map( (response: Response) => HunterUtil.alert( response ) as ServerStatusResponse)
    );
  }

  public getTaskHistoryForTaskId( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.taskHistoryURL + taskId )
          .map( (response: Response) => HunterUtil.alert( response ) as HunterServerResponse)
    );
  }

  public loadTaskForId(taskId: number): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.loadTaskForTaskURL + taskId )
          .map( ( response: Response ) => HunterUtil.alert( response ) as HunterServerResponse )
    );
  }

  public furnishTask(taskId: number): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.furnishTaskURL + taskId )
          .map( ( response: Response ) => HunterUtil.alert( response ) as HunterServerResponse )
    );
  }

  public cloneTask( cloneTask: TaskCloneModel ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.cloneTaskURL, JSON.stringify(cloneTask) )
          .map( ( resp: Response) => resp.json() as ServerStatusResponse )
    );
  }

  public deleteTask( taskId: number ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.deleteTaskURL, JSON.stringify({ taskId: taskId }) )
          .map( ( resp: Response) => resp.json() as ServerStatusResponse )
    );
  }

  public addGroupToTask( taskId: number, groupIds: number[] ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.addGrpToTask, JSON.stringify({ taskId: taskId, groupIds: groupIds }) )
          .map( ( resp: Response) => resp.json() as ServerStatusResponse )
    );
  }

  public getTaskApprovers(): Observable<SelectValue[]> {
    return (
      this.http
          .get( HunterConstants.TASK_APPROVERS_SEL_URL )
          .map( ( resp: Response) => HunterUtil.getDataOrAlert(resp) as SelectValue[] )
    );
  }

  public getReadTasksURL(): string {
    return this.loadTaskForTaskURL;
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
          .map( ( resp: Response) => HunterUtil.getDataOrAlert(resp) as SelectValue[] )
    );
  }

}
