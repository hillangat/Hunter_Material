import { LoggerService } from 'app/shared/logger/logger-service';
import { Observable } from 'RXJS';
export class HunterUtil {

    private static logger: LoggerService;

    public static handleError( error: any, message ): Observable<any>  {
        this.logger.error( 'Error occurred while ' + message + ' ' + JSON.stringify( error ) );
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

    public constructor( private logger: LoggerService ) { }

}
