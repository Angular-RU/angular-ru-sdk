import {AfterViewInit, Directive, ElementRef, Inject, Input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-column]'})
export class FlexColumn extends AbstractFlexLayout implements AfterViewInit {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('flex-direction')
    public flexDirection: Nullable<string> = null;

    constructor(
        @Inject(ElementRef)
        protected readonly elementRef: ElementRef,
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        if (isNotNil(this.flexDirection)) {
            this.elementRef.nativeElement.style.flexDirection = this.flexDirection;
        }

        this.classList.add('flex-column');
    }
}
