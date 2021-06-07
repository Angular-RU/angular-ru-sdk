import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueInterceptor, ControlValueInterceptorDescriptor } from '@angular-ru/common/forms';
import { filter, FilterPredicateFn } from '@angular-ru/common/string';

@Directive({
    selector: '[filter]',
    providers: [ControlValueInterceptor]
})
export class FilterDirective implements OnInit, OnDestroy {
    @Input() public filter: string[] | FilterPredicateFn | RegExp = [];
    public preparedValue: string = '';

    private controlValueOperator: ControlValueInterceptorDescriptor = {
        toModelValue: (value: string): string => {
            this.preparedValue = filter(value, this.filter);
            return this.preparedValue;
        }
    };

    constructor(
        private readonly interceptor: ControlValueInterceptor,
        private readonly elementRef: ElementRef<HTMLInputElement>
    ) {}

    public ngOnInit(): void {
        this.interceptor.attach(this.controlValueOperator);
    }

    public ngOnDestroy(): void {
        this.interceptor.detach(this.controlValueOperator);
    }

    @HostListener('input', ['$event'])
    public onInput(): void {
        this.elementRef.nativeElement.value = this.preparedValue;
    }
}
