/* eslint-disable @angular-eslint/no-input-rename */
import {AfterViewInit, ElementRef, inject, input} from '@angular/core';
import {Directive} from '@angular/core';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-item]'})
export class FlexItem extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    public readonly wide = input<boolean | string>(false, {alias: 'flex-wide'});
    public readonly equalWidth = input<boolean | string>(false, {alias: 'flex-equal'});

    public ngAfterViewInit(): void {
        this.classList.add('flex__item');

        if (this.wide() !== false) {
            this.classList.add('flex__item--wide');
        }

        if (this.equalWidth() !== false) {
            this.classList.add('flex__item--equal-width');
        }
    }
}
