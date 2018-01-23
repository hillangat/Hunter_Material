import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-page-not-found',
    templateUrl: 'page-not-found.component.html',
    styleUrls: ['page-not-found.component.scss']
})
export class PageNotFoundComponent {

    constructor( private router: Router ) {}

    public goHome() {
        this.router.navigateByUrl( '/home/home' );
    }

}

