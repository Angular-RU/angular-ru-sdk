import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    inject,
    input,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {toStringValue} from '@angular-ru/cdk/string';

@Directive({selector: '[convertCase]'})
export class ConvertCase implements AfterViewInit {
    private readonly elementRef = inject<ElementRef>(ElementRef);
    private readonly ngControl = inject<NgControl>(NgControl, {optional: true});

    public readonly toUpperCase = input(true);
    public readonly toLowerCase = input(false);

    private get element(): HTMLInputElement {
        return this.elementRef.nativeElement;
    }

    @HostListener('input')
    public onInput(): void {
        const dirtyValue: string = toStringValue(this.element.value);

        this.element.value = this.toLowerCase()
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
