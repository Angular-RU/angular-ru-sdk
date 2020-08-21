import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

import { AbstractFlexContainer } from './abstract-flex.container';

@Directive({ selector: '[flex-item]' })
export class FlexItemDirective extends AbstractFlexContainer implements AfterViewInit {
    @Input('flex-wide') public wide: boolean | string = false;

    constructor(protected readonly el: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add(`flex__item`);
        if (this.wide !== false) {
            this.classList.add(`flex__item--wide`);
        }
    }
}
