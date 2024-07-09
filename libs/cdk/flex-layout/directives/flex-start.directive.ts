import {AfterViewInit, Directive, ElementRef} from '@angular/core';

import {AbstractFlexLayoutDirective} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-start]'})
export class FlexStartDirective
    extends AbstractFlexLayoutDirective
    implements AfterViewInit
{
    constructor(protected readonly elementRef: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add(`flex-start`);
    }
}
