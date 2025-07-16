import {AfterViewInit, Directive, ElementRef, inject} from '@angular/core';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-none]'})
export class FlexNone extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    public ngAfterViewInit(): void {
        this.classList.add('flex-none');
    }
}
