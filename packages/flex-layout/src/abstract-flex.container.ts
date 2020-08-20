import { Directive, ElementRef } from '@angular/core';

@Directive()
export abstract class AbstractFlexContainer {
    protected abstract readonly el: ElementRef;

    protected get classList(): DOMTokenList {
        return this.el.nativeElement.classList;
    }
}
