import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueInterceptor } from '@angular-ru/common/forms';
import { filter, FilterPredicateFn } from '@angular-ru/common/string';

@Directive({
    selector: '[filter]',
    providers: [ControlValueInterceptor]
})
export class FilterDirective {
    @Input() public filter: string[] | FilterPredicateFn | RegExp = [];
    public preparedValue: string = '';

    private throttle: boolean = false;

    constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

    @HostListener('input', ['$event'])
    public onInput(event: InputEvent): boolean {
        if (this.throttle) {
            this.throttle = false;
        } else {
            const value: string = this.elementRef.nativeElement.value ?? '';
            const prepared: string = filter(value, this.filter);
            const newEvent: InputEvent = new InputEvent('input', { ...event, data: prepared });
            this.elementRef.nativeElement.value = newEvent.data ?? '';

            this.throttle = true;
            this.elementRef.nativeElement.dispatchEvent(newEvent);
        }
        return false;
    }
}
