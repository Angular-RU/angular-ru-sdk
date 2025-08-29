/* eslint-disable @angular-eslint/no-input-rename */
import {AfterViewInit, ElementRef, inject, input} from '@angular/core';
import {Directive} from '@angular/core';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-container]'})
export class FlexContainer extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    public readonly center = input<boolean | string>(false, {alias: 'flex-center'});
    public readonly noWrap = input<boolean | string>(false, {alias: 'no-wrap'});
    public readonly fullWidth = input<boolean | string>(false, {alias: 'full-width'});

    public ngAfterViewInit(): void {
        this.classList.add('flex-container');

        if (this.center() !== false) {
            this.classList.add('flex-container--center');
        }

        if (this.noWrap() !== false) {
            this.classList.add('flex-container__nowrap');
        }

        if (this.fullWidth() !== false) {
            this.classList.add('flex-container__full-width');
        }
    }
}
