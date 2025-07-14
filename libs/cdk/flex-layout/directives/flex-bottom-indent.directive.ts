import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostBinding,
    inject,
    Input,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {AbstractFlexLayout} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-bottom-indent]'})
export class FlexBottomIndent extends AbstractFlexLayout implements AfterViewInit {
    protected readonly elementRef = inject<ElementRef>(ElementRef);

    @Input('flex-bottom-indent')
    @HostBinding('style.margin-bottom.px')
    public bottomIndent: Nullable<number | string> = null;

    public ngAfterViewInit(): void {
        this.classList.add('flex-bottom-indent');
    }
}
