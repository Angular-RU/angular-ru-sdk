import {AfterViewInit, Directive, ElementRef} from '@angular/core';

import {AbstractFlexLayoutDirective} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-end]'})
export class FlexEndDirective
    extends AbstractFlexLayoutDirective
    implements AfterViewInit
{
    constructor(protected readonly elementRef: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add(`flex-end`);
    }
}
