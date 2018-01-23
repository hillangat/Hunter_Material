import { Injectable } from '@angular/core';


@Injectable()
export class LoggerService {

    public log( message: string ): void {
        console.log( message );
    }

    public error( message: string ): void {
        console.error( message );
    }

    public warn( message: string ): void {
        console.warn( message );
    }

}
