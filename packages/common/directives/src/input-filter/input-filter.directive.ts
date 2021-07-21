import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { ControlValueInterceptor } from '@angular-ru/common/forms';
import { filter, FilterPredicate } from '@angular-ru/common/string';
import { Nullable } from '@angular-ru/common/typings';

import { InputFilterConfig } from './input-filter.config';

@Directive({
    selector: '[inputFilter]',
    providers: [ControlValueInterceptor]
})
export class InputFilterDirective {
    @Input() public inputFilter: Nullable<FilterPredicate> = null;
    private manualEvent: Nullable<InputEvent> = null;

    constructor(
        private readonly elementRef: ElementRef<HTMLInputElement>,
        @Optional()
        private readonly config: InputFilterConfig
    ) {}

    @HostListener('input', ['$event'])
    public onInput(baseEvent: InputEvent): void {
        if (this.manualEvent === baseEvent) {
            return;
        }

        const predicate: FilterPredicate = this.inputFilter ?? this.config?.default ?? [];
        const baseValue: string = this.elementRef.nativeElement.value;
        const preparedValue: string = filter(baseValue, predicate);

        if (preparedValue === baseValue) {
            return;
        }

        this.manualEvent = new InputEvent('input', { ...baseEvent, data: preparedValue });
        this.elementRef.nativeElement.value = this.manualEvent?.data ?? '';
        this.elementRef.nativeElement.dispatchEvent(this.manualEvent);
    }
}
