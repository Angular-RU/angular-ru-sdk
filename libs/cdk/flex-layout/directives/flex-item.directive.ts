/* eslint-disable @angular-eslint/no-input-rename */
import {AfterViewInit, ElementRef, inject} from '@angular/core';
import {Directive, Input} from '@angular/core';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-item]'})
export class FlexItem extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    @Input('flex-wide')
    public wide: boolean | string = false;

    @Input('flex-equal')
    public equalWidth: boolean | string = false;

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
