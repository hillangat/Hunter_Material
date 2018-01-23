import { Component } from '@angular/core';
import DynGridHelper from './shared/dyn-grid-helper';
import { LoggerService } from 'app/shared/logger/logger-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    moduleId: module.id,
    selector: 'app-dynamic-grid',
    templateUrl: 'dynamic-grid.component.html',
    styleUrls: ['dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnInit {

    constructor( private logger: LoggerService ) {}

    public ngOnInit() {}

    public createTable(): void {
        const number = DynGridHelper.getPageNumbers();
        this.logger.log( number.toString() );
    }

}
