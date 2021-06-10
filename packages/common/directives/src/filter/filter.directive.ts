import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueInterceptor } from '@angular-ru/common/forms';
import { filter, FilterPredicateFn } from '@angular-ru/common/string';

@Directive({
    selector: '[filter]',
    providers: [ControlValueInterceptor]
})
export class FilterDirective {
    @Input() public filter: string[] | FilterPredicateFn | RegExp = [];

    private throttle: boolean = false;
    private newValue: string = '';
    private newEvent: InputEvent = null!;

    constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

    @HostListener('input', ['$event'])
    public onInput(event: InputEvent): boolean {
        this.stopPropagation(event);

        if (this.throttle) {
            this.throttle = false;
        } else {
            this.prepareNewValue();
            this.prepareNewEvent(event);
            this.throttle = true;
            this.emitNewEvent();
        }
        return false;
    }

    private stopPropagation(event: InputEvent): void {
        if (event instanceof InputEvent) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }

    private prepareNewValue(): void {
        const value: string = this.elementRef.nativeElement.value ?? '';
        this.newValue = filter(value, this.filter);
    }

    private prepareNewEvent(event: InputEvent): void {
        this.newEvent = new InputEvent('input', { ...event, data: this.newValue });
    }

    private emitNewEvent(): void {
        this.elementRef.nativeElement.value = this.newEvent.data ?? '';
        this.elementRef.nativeElement.dispatchEvent(this.newEvent);
    }
}
