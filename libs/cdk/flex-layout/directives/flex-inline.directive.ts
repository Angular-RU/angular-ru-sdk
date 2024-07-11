import {AfterViewInit, Directive, ElementRef, Inject} from '@angular/core';

import {AbstractFlexLayoutDirective} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-inline]'})
export class FlexInlineDirective
    extends AbstractFlexLayoutDirective
    implements AfterViewInit
{
    constructor(
        @Inject(ElementRef)
        protected readonly elementRef: ElementRef,
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add('flex-inline');
    }
}
