import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Nullable } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { AbstractFlexLayoutDirective } from './abstract-flex-layout.directive';

@Directive({ selector: '[flex-column]' })
export class FlexColumnDirective extends AbstractFlexLayoutDirective implements AfterViewInit {
    @Input('flex-direction') public flexDirection: Nullable<string> = null;

    constructor(protected readonly el: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        if (isNotNil(this.flexDirection)) {
            this.el.nativeElement.style.flexDirection = this.flexDirection;
        }

        this.classList.add(`flex-column`);
    }
}
