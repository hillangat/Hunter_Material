import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Alert, AlertTypeEnum, AlertStatusEnum } from '../beans/alert';
import { AlertService } from '../services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']

})

export class AlertComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private alerts: Alert[] = [];
    private alertLifeTime = 10000;

    constructor(private alertService: AlertService) {}

    public ngOnInit() {
        this.subScribeToAlerts();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = undefined;
    }

    private clearAll() {
        this.alerts = [];
    }

    private removeAlert(index: number) {
        this.alerts.splice(index, 1);
    }

    private getClassByAlertType(alert: Alert): string {
        const clss1 = 'alert ';
        const clss = this.getAlertTypClass( alert );
        return clss1 + clss;
    }

    private getAlertTypClass( alert: Alert ): string {
        let clss = null;
        switch (alert.status) {
            case AlertStatusEnum.ERROR:
                clss = 'alertDanger';
                break;
            case AlertStatusEnum.INFO:
                clss = 'alertInfo';
                break;
            case AlertStatusEnum.SUCCESS:
                clss = 'alertSuccess';
                break;
            case AlertStatusEnum.WARNING:
                clss = 'alertWarning';
                break;
            default:
                clss = 'alertInfo';
                break;
        }
        return clss;
    }

    private subScribeToAlerts() {
        this.subscription = this.alertService.getAlert().subscribe(al => {
            if (!al) {
                return;
            }
            this.alerts.push(al);
            this.setAlertLifeTime(this.alerts);
        });
    }

    private setAlertLifeTime(alerts: Alert[]) {
        setTimeout( () => alerts.splice(0, 1), this.alertLifeTime);
    }



}

