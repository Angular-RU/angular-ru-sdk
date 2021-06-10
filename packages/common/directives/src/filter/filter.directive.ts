import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueInterceptor } from '@angular-ru/common/forms';
import { filter, FilterPredicate } from '@angular-ru/common/string';

@Directive({
    selector: '[filter]',
    providers: [ControlValueInterceptor]
})
export class FilterDirective {
    @Input() public filter: FilterPredicate = [];

    private manualEvent: InputEvent | null = null;

    constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

    @HostListener('input', ['$event'])
    public onInput(baseEvent: InputEvent): void {
        if (this.isNotPreviousEvent(baseEvent)) {
            const prepared: string = this.prepareValue();
            this.manualEvent = new InputEvent('input', { ...baseEvent, data: prepared });
            this.emitManualEvent(this.manualEvent);
        }
    }

    private prepareValue(): string {
        const value: string = this.elementRef.nativeElement.value ?? '';
        return filter(value, this.filter);
    }

    private emitManualEvent(manualEvent: InputEvent): void {
        this.elementRef.nativeElement.value = manualEvent?.data ?? '';
        this.elementRef.nativeElement.dispatchEvent(manualEvent);
    }

    private isNotPreviousEvent(event: InputEvent): boolean {
        return this.manualEvent !== event;
    }
}
