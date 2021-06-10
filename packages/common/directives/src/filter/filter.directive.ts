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
        if (this.manualEvent === baseEvent) {
            return;
        }

        const baseValue: string = this.elementRef.nativeElement.value;
        const preparedValue: string = filter(baseValue, this.filter);

        if (preparedValue === baseValue) {
            return;
        }

        this.manualEvent = new InputEvent('input', { ...baseEvent, data: preparedValue });
        this.elementRef.nativeElement.value = this.manualEvent?.data ?? '';
        this.elementRef.nativeElement.dispatchEvent(this.manualEvent);
    }
}
