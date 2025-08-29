import {AfterViewInit, Directive, ElementRef, inject, input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({
    selector: '[flex-bottom-indent]',
    host: {
        '[style.margin-bottom.px]': 'bottomIndent()',
    },
})
export class FlexBottomIndent extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    public readonly bottomIndent = input<Nullable<number | string>>(null, {
        alias: 'flex-bottom-indent',
    });

    public ngAfterViewInit(): void {
        this.classList.add('flex-bottom-indent');
    }
}
