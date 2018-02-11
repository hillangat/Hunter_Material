import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-card-title-header',
    templateUrl: 'card-title-header.component.html',
    styleUrls: ['card-title-header.component.scss']
})
export class CardTitleHeaderComponent {
    @Input('title') public title: string;
    @Input('iconName') public iconName: string;
}
