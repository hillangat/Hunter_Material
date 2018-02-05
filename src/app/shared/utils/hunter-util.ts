import { LoggerService } from 'app/shared/logger/logger-service';
import { Observable } from 'RXJS';
export class HunterUtil {

    private static logger: LoggerService;

    public static handleError( error: any, message ): Observable<any>  {
        this.logger.error( 'Error occurred while ' + message + ' ' + JSON.stringify( error ) );
        return Observable.throw( error );
    }

    public constructor( private logger: LoggerService ) { }

}
