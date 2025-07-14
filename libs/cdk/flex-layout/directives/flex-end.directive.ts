import {AfterViewInit, Directive, ElementRef, inject} from '@angular/core';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-end]'})
export class FlexEnd extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    public ngAfterViewInit(): void {
        this.classList.add('flex-end');
    }
}
