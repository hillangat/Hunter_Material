import { HunterUtil } from './../../shared/utils/hunter-util';
import { Router, ActivatedRoute } from '@angular/router';
import { States } from 'app/shared/enums/states.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../shared/services/client.service';
import { SelectValue } from '../../shared/beans/SelectValue';
import { AlertService } from 'app/shared/services/alert.service';
import { FormGroup } from '@angular/forms/src/model';
import { Task } from '../../shared/beans/Task';
import { TaskCloneModel } from '../../shared/beans/clone-task-model';
import { TaskService } from '../shared/services/task.service';
import { ServerStatusResponse } from '../../shared/beans/server-status-response';

@Component({
    moduleId: module.id,
    selector: 'app-clone-task',
    templateUrl: 'clone-task.component.html',
    styleUrls: ['clone-task.component.scss']
})
export class CloneTaskComponent implements OnInit {

    public clientsSelVals: SelectValue[];
    public cloneTaskGroup: FormGroup;
    public title: 'Clone Task';
    public state: States;

    private task: Task;
    private taskId: number;

    constructor(
        private clientService: ClientService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        const _id: string = activatedRoute.snapshot.paramMap.get( 'taskId' );
        this.taskId = _id != null ? Number( _id) : 0;
    }

    public ngOnInit(): void {
        this.loadClients();
        this.loadTask();
    }

    private loadClients(): void {
        this.state = States.LOADING;
        this.clientService
            .getAllClientsSelVals()
            .subscribe(
                ( clientsSelVals: SelectValue[] ) => {
                    this.clientsSelVals = clientsSelVals;
                    this.state = States.SUCCESS;
                },
                ( error: any ) => {
                    this.state = States.ERROR_OCCURRED;
                    this.alertService.error( 'Application error occurred while trying to get clients.' );
                }
            );
    }

    private loadTask(): void {
        this.state = States.LOADING;
        this.taskService
            .getTaskById( this.taskId )
            .subscribe(
                ( task: Task ) => {
                    this.task = task;
                    this.initForm();
                    this.state = States.SUCCESS;
                },
                ( error: any ) => {
                    this.state = States.ERROR_OCCURRED;
                    this.alertService.error( 'Application error occurred while trying to get clients.' );
                }
            );
    }

    private initForm() {
        this.cloneTaskGroup = this.formBuilder.group({
            taskId:  [ this.taskId ],
            taskName: [this.task.taskName, [ <any>Validators.required, <any>Validators.minLength(5), <any>Validators.maxLength(50) ] ],
            taskDescription: [this.task.description, [ <any>Validators.required, <any>Validators.maxLength(100) ] ],
            newOwner: ['', undefined ]
        });
    }

    private cloneTask() {
        if ( this.cloneTaskGroup.valid ) {
            const cloneTask: TaskCloneModel = this.cloneTaskGroup.value as TaskCloneModel;
            this.taskService
                .cloneTask(cloneTask)
                .subscribe(
                    ( resp: ServerStatusResponse ) => {
                        if ( resp.status + '' === 'Success' ) {
                            this.alertService.success( resp.message );
                            this.router.navigate( ['./task/details/' + this.task.taskId ] );
                        } else {
                            this.alertService.error( resp.message );
                        }
                        // this.hideModal();
                    },
                    ( error: any ) => {
                        this.alertService.error( 'Application error occurred' );
                    }
                );
        } else {
            this.alertService.error('Please correct errors before submitting!', false);
        }
    }

    public goBack() {
        if ( this.cloneTaskGroup )  {
            this.cloneTaskGroup.reset();
        }
        this.router.navigate( ['./grid'] );
    }

}
