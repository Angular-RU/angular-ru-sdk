import { AfterViewInit, Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[trimInput]' })
export class TrimInputDirective implements AfterViewInit {
    constructor(private readonly el: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

    public ngAfterViewInit(): void {
        this.trimValue();
    }

    @HostListener('keydown.enter')
    public onEnter(): void {
        this.trimValue();
    }

    @HostListener('blur')
    public onBlur(): void {
        this.trimValue();
    }

    private trimValue(): void {
        const dirtyValue: string = this.el.nativeElement.value?.trim();
        this.ngControl?.reset(dirtyValue);
        this.el.nativeElement.value = dirtyValue;
    }
}
