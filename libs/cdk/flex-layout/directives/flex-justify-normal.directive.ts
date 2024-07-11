import {AfterViewInit, Directive, ElementRef, Inject} from '@angular/core';

import {AbstractFlexLayoutDirective} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-justify-normal]'})
export class FlexJustifyNormalDirective
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
        this.classList.add('flex-justify-normal');
    }
}
