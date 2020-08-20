import { AfterViewInit, Directive, ElementRef } from '@angular/core';

import { AbstractFlexContainer } from './abstract-flex.container';

@Directive({ selector: '[flex-none]' })
export class FlexNoneDirective extends AbstractFlexContainer implements AfterViewInit {
    constructor(protected readonly el: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add(`flex-none`);
    }
}
