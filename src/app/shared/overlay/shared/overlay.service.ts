import { OverlayInput } from './../../beans/OverlayInput';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'Rxjs';


@Injectable()
export class OverlayService {

    private subject = new Subject<OverlayInput>();

    public openCloseOverlay( overlayInput: OverlayInput ) {
        this.subject.next( overlayInput );
    }

    public clearOverlay() {
        this.subject.next();
    }

    public removeOverlay() {
        this.openCloseOverlay( { wholeScreen: false, message: undefined } );
    }

    public openOverlay( wholseScreen: boolean, message: string ) {
        this.openCloseOverlay( { wholeScreen: wholseScreen, message: message } );
    }

    public getService(): Observable<any> {
        return this.subject.asObservable();
    }
}
