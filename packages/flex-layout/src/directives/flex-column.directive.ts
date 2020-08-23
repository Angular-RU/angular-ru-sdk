import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

import { AbstractFlexLayoutDirective } from './abstract-flex-layout.directive';

@Directive({ selector: '[flex-column]' })
export class FlexColumnDirective extends AbstractFlexLayoutDirective implements AfterViewInit {
    @Input('flex-direction') public flexDirection: string | null = null;

    constructor(protected readonly el: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        if (this.flexDirection) {
            this.el.nativeElement.style.flexDirection = this.flexDirection;
        }

        this.classList.add(`flex-column`);
    }
}
