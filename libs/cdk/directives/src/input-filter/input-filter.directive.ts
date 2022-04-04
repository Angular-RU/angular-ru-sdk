import { Directive, ElementRef, HostListener, Inject, Input, Optional } from '@angular/core';
import { hasItems } from '@angular-ru/cdk/array';
import { ControlValueInterceptor } from '@angular-ru/cdk/forms';
import { filter, FilterPredicate } from '@angular-ru/cdk/string';
import { Nullable } from '@angular-ru/cdk/typings';
import { checkValueIsFilled } from '@angular-ru/cdk/utils';

import { InputFilterConfig } from './input-filter.config';

@Directive({
    selector: '[inputFilter]',
    providers: [ControlValueInterceptor]
})
export class InputFilterDirective {
    private manualEvent: Nullable<InputEvent> = null;
    @Input() public declare inputFilter: FilterPredicate | '';
    @Input() public filterDisabled: boolean = false;

    constructor(
        private readonly elementRef: ElementRef<HTMLInputElement>,
        @Optional()
        @Inject(InputFilterConfig)
        private readonly config: Nullable<InputFilterConfig>
    ) {}

    @HostListener('input', ['$event'])
    public onInput(baseEvent: InputEvent): void {
        if (this.filterDisabled || this.manualEvent === baseEvent) {
            return;
        }

        const predicate: FilterPredicate | '' = this.getPredicate();
        const baseValue: string = this.elementRef.nativeElement.value;
        const preparedValue: string = filter(baseValue, predicate);

        if (preparedValue === baseValue) {
            return;
        }

        this.manualEvent = new InputEvent('input', { ...baseEvent, data: preparedValue });
        this.elementRef.nativeElement.value = this.manualEvent?.data ?? '';
        this.elementRef.nativeElement.dispatchEvent(this.manualEvent);
    }

    private getPredicate(): FilterPredicate | '' {
        const isInputPredicate: boolean = Array.isArray(this.inputFilter)
            ? hasItems(this.inputFilter)
            : checkValueIsFilled(this.inputFilter);

        return isInputPredicate ? this.inputFilter : this.config?.default ?? [];
    }
}
