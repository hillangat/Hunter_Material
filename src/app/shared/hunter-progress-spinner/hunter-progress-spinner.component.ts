import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-hunter-progress-spinner',
    templateUrl: 'hunter-progress-spinner.component.html',
    styleUrls: ['hunter-progress-spinner.component.scss']
})
export class HunterProgressSpinnerComponent implements OnInit, OnDestroy {

    @Input( 'message' ) public message: string;
    @Input( 'diameter' ) public diameter: number;

    public constructor() {}

    public ngOnInit(): void {
        alert( 'message ' + this.message );
        alert( 'diameter ' + this.diameter );
     }
    public ngOnDestroy(): void { }

}
