import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';

const MIN_DELAY: number = 500;

@Directive({ selector: '[initialFocus]' })
export class InitialFocusDirective implements AfterViewInit, OnDestroy {
    @Input() public focusDelay: number = MIN_DELAY;
    private readonly className: string = 'initial-focused';
    private timeoutId: number | null = null;

    constructor(private readonly element: ElementRef<HTMLInputElement>, private readonly ngZone: NgZone) {}

    private get el(): HTMLInputElement {
        return this.element.nativeElement;
    }

    public ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearInterval(this.timeoutId!);
            this.timeoutId = window.setInterval((): void => this.focus(), this.focusDelay);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.timeoutId!);
    }

    private isFocused(): boolean {
        return this.elementIsActive() || this.el.classList.contains(this.className);
    }

    private elementIsActive(): boolean {
        return document.activeElement === this.element.nativeElement;
    }

    private focus(): void {
        if (this.isFocused()) {
            window.clearInterval(this.timeoutId!);
            return;
        }

        this.el.focus();
        this.el.setSelectionRange(this.el.value.length, this.el.value.length);

        if (this.elementIsActive()) {
            this.el.classList.add(this.className);
            window.clearInterval(this.timeoutId!);
        }
    }
}
