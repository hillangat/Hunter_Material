import { HunterUtil } from 'app/shared/utils/hunter-util';
import { TaskMessage } from './../../shared/beans/TaskMessage';
import { AlertService } from './../../shared/services/alert.service';
import { Task } from './../../shared/beans/Task';
import { SelectValue } from './../../shared/beans/SelectValue';
import { LoggerService } from 'app/shared/logger/logger-service';
import { HunterServerResponse } from './../../shared/beans/ServerResponse';
import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-text-message',
    templateUrl: 'task-text-message.component.html',
    styleUrls: ['task-text-message.component.scss']
})
export class TaskTextMessageComponent implements OnInit {

    public panelOpenState: false;
    public providers: SelectValue[] = [];
    public taskLifeStatuses: SelectValue[] = [];

    @Input('task') private task: Task;
    @Input('taskLifeStatus') private taskLifeStatus: String;

    private textMsgFormGroup: FormGroup;

    constructor(
        private taskService: TaskService,
        private logger: LoggerService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) { }

    public ngOnInit(): void {
        this.getMessageForTask();
    }

    public getTextCount(): number {
        const exist: boolean = (
            this.textMsgFormGroup &&
            this.textMsgFormGroup.controls &&
            this.textMsgFormGroup.controls['text'] &&
            this.textMsgFormGroup.controls['text'].value
        );
        if ( exist ) {
            return this.textMsgFormGroup.controls['text'].value.length;
        }
        return 0;
    }

    private createFormGroup(): void {
        this.textMsgFormGroup = this.formBuilder.group({
            text: [ this.task && this.task.taskMessage ? this.task.taskMessage.msgText : '', Validators.required ],
            disclaimer: [ this.task && this.task.taskMessage ? this.task.taskMessage.disclaimer : '', Validators.required ],
            fromPhone: [ this.task && this.task.taskMessage ? this.task.taskMessage.fromPhone : undefined, Validators.required],
            msgLifeStatus: [ this.task && this.task.taskMessage ? this.task.taskMessage.msgLifeStatus : 'Draft', Validators.required ],
            pageable: [ this.task && this.task.taskMessage ? this.task.taskMessage.pageable : false, Validators.required ],
            taskId: this.task.taskId,
            msgTaskType: this.task.tskMsgType,
            provider: [ this.task && this.task.taskMessage ? this.task.taskMessage.provider : undefined, Validators.required ]
        });
    }

    private loadLifeStatuses(): void {
        this.taskService
            .getTaskLifeStatuses()
            .subscribe(
                ( statuses: SelectValue[] ) => {
                    this.taskLifeStatuses = statuses;
                    this.logger.log( 'Successfully loaded task life statuses.' );
                },
                ( error: any ) => {
                    this.logger.error( 'An error occurred while trying to load task life statuses: ' + JSON.stringify( error ) );
                }
            );
    }

    private loadProvidersSelVals(): void {
        this.taskService
            .getServiceProvidersSelVals( this.task.taskId )
            .subscribe(
                ( resp: HunterServerResponse ) => {
                    const data: SelectValue[] = resp.data as SelectValue[];
                    this.providers = data;
                    this.logger.log( 'provider select values : ' + JSON.stringify( resp.data ) );
                },
                ( error: any ) => {
                    this.logger.error( 'Error occurred while trying to load providers: ' + JSON.stringify( error ) );
                }
            );
    }

    private updateTaskMessage( taskMessage: TaskMessage ): void {
        if ( !this.task.taskMessage ) {
            this.task.taskMessage = taskMessage;
        } else {
            this.logger.log( 'Old Text Message >> ' + JSON.stringify( this.task.taskMessage ) );
            Object.keys( taskMessage ).forEach( ( n: string )  => {
                Object.keys( this.task.taskMessage ).forEach( ( o: string ) => {
                    if ( n === o && taskMessage[n] != null ) {
                        this.task.taskMessage[n] = taskMessage[n];
                    }
                })
            });
            this.logger.log( 'Updated Text Message > ' + JSON.stringify( this.task.taskMessage ) );
        }
    }

    private createTaskMessage() {
        if ( this.textMsgFormGroup.valid ) {
            this.taskService
            .createTaskMessage( this.task.taskId, this.textMsgFormGroup.value )
            .subscribe(
                ( resp: HunterServerResponse ) => {
                    if ( resp.data != null ) {
                        const taskMessage = resp.data[0] as TaskMessage;
                        this.updateTaskMessage( taskMessage );
                        this.alertService.success('Successfully saved the changes.', false);
                    }
                    this.logger.log( JSON.stringify( resp ) );
                    this.logger.log( 'Successfully created task message' );
                },
                ( error: any ) => {
                    this.logger.error( 'Error occurred while trying to create task message >> ' + JSON.stringify( error ) );
                }
            );
        } else {
            this.alertService.error( 'Values provided for message creation invalid. Please correct and try again.' );
        }
    }

    private resetTheForm() {
        this.textMsgFormGroup.reset();
    }

    private getMessageForTask(): void {
        this.taskService
            .getMessageForTask( this.task.taskId )
            .subscribe(
                ( resp: HunterServerResponse ) => {
                    if ( HunterUtil.isNotEmpty( resp.data ) ) {
                        const taskMessage: TaskMessage = resp.data[0] as TaskMessage;
                        this.task.taskMessage = taskMessage;
                        this.furnishTask();
                    } else {
                        this.alertService.warn( 'No message found', false );
                        this.furnishTask();
                    }
                },
                ( error: any ) => {
                    this.logger.error( 'Error occurred while loading message for task!' );
                },
                () => {
                    this.furnishTask();
                }
            );

    }

    private furnishTask() {
        this.createFormGroup();
        this.loadProvidersSelVals();
        this.loadLifeStatuses();
    }


}
