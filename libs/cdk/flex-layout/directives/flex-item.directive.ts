/* eslint-disable @angular-eslint/no-input-rename */
import {AfterViewInit, ElementRef, Inject} from '@angular/core';
import {Directive, Input} from '@angular/core';

import {AbstractFlexLayoutDirective} from './abstract-flex-layout.directive';

@Directive({standalone: false, selector: '[flex-item]'})
export class FlexItemDirective
    extends AbstractFlexLayoutDirective
    implements AfterViewInit
{
    @Input('flex-wide')
    public wide: boolean | string = false;

    @Input('flex-equal')
    public equalWidth: boolean | string = false;

    constructor(
        @Inject(ElementRef)
        protected readonly elementRef: ElementRef,
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add('flex__item');

        if (this.wide !== false) {
            this.classList.add('flex__item--wide');
        }

        if (this.equalWidth !== false) {
            this.classList.add('flex__item--equal-width');
        }
    }
}
