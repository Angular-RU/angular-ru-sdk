import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[trimInput]'
})
export class TrimInputDirective implements AfterViewInit {
    constructor(private readonly el: ElementRef) {}

    public ngAfterViewInit(): void {
        this.onBlur();
        this.onEnter();
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
        const dirtyValue: string = this.el.nativeElement.value;
        this.el.nativeElement.value = dirtyValue.trim();
    }
}
