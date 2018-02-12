import { OverlayInput } from './../beans/OverlayInput';
import { OverlayService } from './shared/overlay.service';

import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnDestroy {

    private overlayIsOn = false;
    private message: string;
    private _wholeScreen = false;
    private subscription: Subscription;

    constructor( private overLayService: OverlayService ) {
        this.subscription = (
            this.overLayService
                .getService()
                .subscribe( ( overlayInput: OverlayInput ) => { this.openCloseOverlay( overlayInput ) } )
        );
    }

    public openCloseOverlay( overlayInput: OverlayInput ) {
        this._wholeScreen = overlayInput.wholeScreen;
        this.message = overlayInput.message;
        this.overlayIsOn = !this.overlayIsOn;
        if ( !this.overlayIsOn ) {
            this.clear();
        }
    }

    public get wholeScreen() {
        return this._wholeScreen;
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private clear() {
        this._wholeScreen = false;
        this.message = undefined;
    }

}
