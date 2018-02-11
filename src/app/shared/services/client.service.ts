import { Observable } from 'RXJS';
import { HunterConstants } from './../constants/HunterConstants';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Client } from '../beans/client';
import { SelectValue } from '../beans/SelectValue';
import { HunterUtil } from 'app/shared/utils/hunter-util';
import { AlertService } from './alert.service';


@Injectable()
export class ClientService {

    constructor( private http: Http, private alertService: AlertService ) {}

    public getAllClientsSelVals(): Observable<SelectValue[]> {
        return (
            this.http
                .get( HunterConstants.ALL_CLIENT_SEL_URL )
                .map( (response: Response) => HunterUtil.getDataOrAlert(response, this.alertService) as SelectValue[])
        );
    }
}
