import { Subscription } from 'rxjs/Subscription';
import { Directive, ElementRef, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';



@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

    private clickCount = 0;

    @Output()
    public clickOutside = new EventEmitter();

    constructor(private _elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        if (!targetElement) {
            return;
        }
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside &&  this.clickCount > 0) {
            this.clickOutside.emit(event);
            this.clickCount = 0;
        } else {
            this.clickCount++;
        }
    }

}
