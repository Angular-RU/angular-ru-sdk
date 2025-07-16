/* eslint-disable @angular-eslint/no-input-rename */
import {AfterViewInit, ElementRef, inject} from '@angular/core';
import {Directive, Input} from '@angular/core';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-container]'})
export class FlexContainer extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    @Input('flex-center')
    public center: boolean | string = false;

    @Input('no-wrap')
    public noWrap: boolean | string = false;

    @Input('full-width')
    public fullWidth: boolean | string = false;

    public ngAfterViewInit(): void {
        this.classList.add('flex-container');

        if (this.center !== false) {
            this.classList.add('flex-container--center');
        }

        if (this.noWrap !== false) {
            this.classList.add('flex-container__nowrap');
        }

        if (this.fullWidth !== false) {
            this.classList.add('flex-container__full-width');
        }
    }
}
