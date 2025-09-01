import {AfterViewInit, Directive, ElementRef, inject, input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-column]'})
export class FlexColumn extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    public readonly flexDirection = input<Nullable<string>>(null, {
        alias: 'flex-direction',
    });

    public ngAfterViewInit(): void {
        const flexDirection = this.flexDirection();

        if (isNotNil(flexDirection)) {
            this.elementRef.nativeElement.style.flexDirection = flexDirection;
        }

        this.classList.add('flex-column');
    }
}
