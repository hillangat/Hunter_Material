import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-task-email-message',
    templateUrl: 'task-email-message.component.html',
    styleUrls: ['task-email-message.component.scss']
})
export class TaskEmailMessageComponent {

    @Input('taskId') private taskId: number;

}
