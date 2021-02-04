import { Directive, ElementRef, HostListener, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[trimInput]' })
export class TrimInputDirective implements OnInit {
    constructor(private readonly el: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

    public ngOnInit(): void {
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
        this.el.nativeElement.value = this.el.nativeElement.value?.toString().trim();
        const modelValue: string = this.ngControl?.value?.toString().trim();
        this.ngControl?.reset(modelValue);
    }
}
