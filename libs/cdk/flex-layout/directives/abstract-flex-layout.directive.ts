import {Directive, ElementRef} from '@angular/core';

@Directive()
export abstract class AbstractFlexLayoutDirective {
    protected abstract readonly elementRef: ElementRef;

    protected get classList(): DOMTokenList {
        return this.elementRef.nativeElement.classList;
    }
}
