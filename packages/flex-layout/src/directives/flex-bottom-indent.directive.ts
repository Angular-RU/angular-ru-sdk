import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';

import { AbstractFlexLayoutDirective } from './abstract-flex-layout.directive';

@Directive({ selector: '[flex-bottom-indent]' })
export class FlexBottomIndentDirective extends AbstractFlexLayoutDirective implements AfterViewInit {
    @Input('flex-bottom-indent')
    @HostBinding('style.margin-bottom.px')
    public bottomIndent: string | number | null = null;

    constructor(protected readonly el: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add(`flex-bottom-indent`);
    }
}
