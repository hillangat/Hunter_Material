import { LoggerService } from 'app/shared/logger/logger-service';
import { Observable } from 'RXJS';
import { Response } from '@angular/http'
import { AlertService } from '../services/alert.service';
import { HunterServerResponse } from '../beans/ServerResponse';
import { ServerStatusesEnum } from '../beans/server-status-response';
export class HunterUtil {

    public static handleError( error: any, message ): Observable<any>  {
        // HunterUtil.logger.error( 'Error occurred while ' + message + ' ' + JSON.stringify( error ) );
        return Observable.throw( error );
    }

    public static isNotEmpty( array: any[] ): boolean {
        return array !== null && array !== undefined && array.length > 0;
    }

    /**
     * Assumption: ServerStatusResponse has 'status' and 'message' elements and no other.
     * @param array
     */
    public static isStatusResp( obj: object ): boolean {
        let stsResp = true;
        Object.keys( obj ).forEach(e => stsResp = stsResp ? ( e === 'message' || e === 'status' ) : stsResp );
        return stsResp;
    }

    public static alert( response: Response, alertService: AlertService ): any {
        const serverRep: HunterServerResponse = response.json() as HunterServerResponse;
        if ( serverRep.message != null ) {
            switch ( serverRep.status ) {
                case ServerStatusesEnum.Success :
                    alertService.success( serverRep.message );
                    break;
                case ServerStatusesEnum.Failed :
                    alertService.error( serverRep.message );
                    break;
                default: break;
            }
        }
        return serverRep;
    }

    public static getDataOrAlert( response: Response, alertService: AlertService ): any[] {
        const serverRep: HunterServerResponse = this.alert( response, alertService ) as HunterServerResponse;
        return serverRep.status === ServerStatusesEnum.Success ? serverRep.data : [];
    }

    public static getFormatedDate(date: Date) {

        const year: string     = date.getFullYear() + '';
        const hour: string     = date.getHours() + ''

        let
        month: string    = date.getMonth() + '',
        date_: string    = date.getDate() + '',
        minute: string   = date.getMinutes() + '',
        secs: string     = date.getSeconds() + '';

        month  = month.length  < 2 ? '0' + month  : month;
        date_  = date_.length  < 2 ? '0' + date_  : date_;
        minute = minute.length < 2 ? '0' + minute : minute;
        secs   = secs.length   < 2 ? '0' + secs   : secs;

        const formatedDate    = year + '-' + month + '-' + date_ + ' ' + hour + ':' + minute + ':' + secs;
        return formatedDate;
      }

}
