import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-prog-spinner',
    templateUrl: 'prog-spinner.component.html',
    styleUrls: ['prog-spinner.component.scss']
})
export class ProgSpinnerComponent implements OnInit, OnDestroy {

    @Input( 'message' ) public message: string;
    @Input( 'diameter' ) public diameter: number;
    @Input( 'marginTop' ) public marginTop: number;

    public constructor() {}

    public ngOnInit(): void {}
    public ngOnDestroy(): void { }

}
