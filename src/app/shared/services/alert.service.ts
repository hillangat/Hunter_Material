import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/subject';

import { Alert, AlertTypeEnum, AlertStatusEnum } from '../beans/alert';
import { Observable } from 'RXJS';

@Injectable()
export class AlertService {

    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor( private router: Router ) {
        router.events.subscribe( event => {
                if ( this.keepAfterRouteChange ) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
        });
    }

    clear() {
        this.subject.next();
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertStatusEnum.SUCCESS, message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertStatusEnum.ERROR, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertStatusEnum.INFO, message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false) {
        this.alert(AlertStatusEnum.WARNING, message, keepAfterRouteChange);
    }

    alert(status: AlertStatusEnum, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Alert>{ status: status, message: message });
    }


}
