import {AfterViewInit, Directive, ElementRef, Inject} from '@angular/core';

import {AbstractFlexLayoutDirective} from './abstract-flex-layout.directive';

@Directive({standalone: false, selector: '[flex-end]'})
export class FlexEndDirective
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
        this.classList.add('flex-end');
    }
}
