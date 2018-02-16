import { Router } from '@angular/router';
import { ServerStatusesEnum } from './../../shared/beans/server-status-response';
import { Task } from './../../shared/beans/Task';
import { LoggerService } from 'app/shared/logger/logger-service';
import { SelectValue } from './../../shared/beans/SelectValue';
import { ClientService } from './../../shared/services/client.service';
import { Component } from '@angular/core';
import { TaskService } from 'app/task/shared/services/task.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AlertService } from '../../shared/services/alert.service';
import { taskTypes } from '../../shared/beans/dropdowns-values';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HunterUtil } from '../../shared/utils/hunter-util';
import { TaskFieldsModel } from '../../shared/beans/task-field-model';
import { ServerStatusResponse } from '../../shared/beans/server-status-response';
import { HunterServerResponse } from '../../shared/beans/ServerResponse';

@Component({
    moduleId: module.id,
    selector: 'app-edit-task-fields',
    templateUrl: 'edit-task-fields.component.html',
    styleUrls: ['edit-task-fields.component.scss']
})
export class EditTaskFieldsComponent implements OnInit {

    public clientsSelVals: SelectValue[] = [];
    public taskTypes: SelectValue[] = [];
    public approvers: SelectValue[] = [];
    public messageTypes: SelectValue[] = [];
    public gateWayClients: SelectValue[] = [];

    public createTaskFormGroup: FormGroup;

    constructor(
        private taskService: TaskService,
        private clientService: ClientService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private logger: LoggerService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.loadClients();
        this.loadTaskTypes();
        this.loadApprovers();
        this.loadMessageTypes();
        this.loadGateWayClients( 'Text' );
        this.createform();
    }

    public createform(): void {
        this.createTaskFormGroup = this.formBuilder.group({
            taskName: ['', Validators.required ],
            description: ['', Validators.maxLength( 100 ) ],
            taskObjective: ['', Validators.maxLength(100) ],
            tskMsgType: ['Text', Validators.required ],
            gateWayClient: [''],
            taskDateline: [new Date(), Validators.required ],
            taskApprover: [''],
            taskType: ['', Validators.required ],
            clientId: ['', Validators.required ],
            tskAgrmntLoc: [''],
            taskApproved: [false ],
            recurrentTask: [false ],
            desiredReceiverCount: [0],
            taskBudget: [0, Validators.required ],
            taskCost: [0],
            availableReceiverCount: [0],
            confirmedReceiverCount: [0],
            taskId: [0, Validators.required ],
            srlzdTskPrcssJbObjsFilLoc: ['']
        });
    }

    public createTask(): void {
        if ( !this.createTaskFormGroup.valid ) {
            this.alertService.warn( 'Task data provided are invalid. Please correct and try again.' );
            return;
        }
        const task = this.sanitizeForm() as TaskFieldsModel;
        this.taskService
            .createOrUpdateTask( task )
            .subscribe(
                ( resp: HunterServerResponse ) => {
                    if ( resp.status === ServerStatusesEnum.Success ) {
                        const taskId: number = resp.data[0].taskId;
                        this.router.navigate( [ '/task/details/' + taskId ] );
                    }
                    this.logger.log( JSON.stringify( resp ) );
                },
                ( error: any ) => {
                    this.logger.log( JSON.stringify( error ) );
                }
            );
    }

    public clearForm(): void {
        this.createTaskFormGroup.reset();
    }

    private loadClients(): void {
        this.clientService
            .getAllClientsSelVals()
            .subscribe(
                ( clientsSelVals: SelectValue[] ) => {
                    this.clientsSelVals = clientsSelVals;
                },
                ( error: any ) => {
                    this.alertService.error( 'Application error occurred while trying to get clients.' );
                }
            );
    }

    private loadTaskTypes(): void {
        this.taskService
            .getTaskTypes()
            .subscribe(
                ( taskTypes: SelectValue[] ) => {
                    this.taskTypes = taskTypes;
                },
                ( error: any ) => {
                    this.alertService.error( 'Application error occurred while trying to get task types.' );
                }
            );
    }

    private loadApprovers(): void {
        this.taskService
            .getTaskApprovers()
            .subscribe(
                ( approvers: SelectValue[] ) => {
                    this.approvers = approvers;
                },
                ( error: any ) => {
                    this.alertService.error( 'Application error occurred while trying to get task approvers.' );
                }
            );
    }

    private loadMessageTypes(): void {
        this.taskService
            .getMessageTypesSelVals()
            .subscribe(
                ( msgTypes: SelectValue[] ) => {
                    this.messageTypes = msgTypes;
                },
                ( error: any ) => {
                    this.alertService.error( 'Application error occurred while trying to get message types.' );
                }
            );
    }

    private loadGateWayClients( selMsgType: string ): void {
        this.taskService
            .getGatewayClientsSelVals( selMsgType )
            .subscribe(
                ( gatewayClients: SelectValue[] ) => {
                    this.gateWayClients = gatewayClients;
                },
                ( error: any ) => {
                    this.alertService.error( 'Application error occurred while trying to gateway clients' );
                }
            );
    }

    private getSelMsgType(): string {
        const selMsgType: string = this.createTaskFormGroup ? this.createTaskFormGroup.controls['taskMessageType'].value : null;
        return selMsgType && selMsgType !== '' ? selMsgType : 'Text';
    }

    private onChangeMessageType( selMsgType: any ): void {
        const gatewayClientControl = this.createTaskFormGroup.controls['gateWayClient'];
        if ( gatewayClientControl ) {
            gatewayClientControl.setValue( null );
        }
        this.loadGateWayClients( selMsgType.value );
    }

    private sanitizeForm(): any {
        const value: any = Object.assign({}, this.createTaskFormGroup.value);
        const dateLine: Date = value.taskDateline;
        if ( dateLine ) {
            const date: Date = new Date( dateLine );
            value.taskDateline = HunterUtil.getFormatedDate( date );
        }
        this.logger.log( JSON.stringify( value ) );
        return value;
    }

}

