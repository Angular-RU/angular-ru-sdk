import {AfterViewInit, Directive, ElementRef, HostBinding, Input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {AbstractFlexLayoutDirective} from './abstract-flex-layout.directive';

@Directive({selector: '[flex-bottom-indent]'})
export class FlexBottomIndentDirective
    extends AbstractFlexLayoutDirective
    implements AfterViewInit
{
    @Input('flex-bottom-indent')
    @HostBinding('style.margin-bottom.px')
    public bottomIndent: Nullable<string | number> = null;

    constructor(protected readonly elementRef: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        this.classList.add(`flex-bottom-indent`);
    }
}
