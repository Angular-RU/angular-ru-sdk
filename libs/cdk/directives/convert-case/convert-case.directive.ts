import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Input,
    Optional,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {toStringValue} from '@angular-ru/cdk/string';

@Directive({standalone: false, selector: '[convertCase]'})
export class ConvertCaseDirective implements AfterViewInit {
    @Input()
    public toUpperCase = true;

    @Input()
    public toLowerCase = false;

    constructor(
        @Inject(ElementRef)
        private readonly elementRef: ElementRef,
        @Inject(NgControl)
        @Optional()
        private readonly ngControl?: NgControl,
    ) {}

    private get element(): HTMLInputElement {
        return this.elementRef.nativeElement;
    }

    @HostListener('input')
    public onInput(): void {
        const dirtyValue: string = toStringValue(this.element.value);

        this.element.value = this.toLowerCase
            ? dirtyValue.toLowerCase()
            : dirtyValue.toUpperCase();
        this.ngControl?.reset(this.element.value);
    }

    public ngAfterViewInit(): void {
        if (this.element.value) {
            this.onInput();
        }
    }
}
