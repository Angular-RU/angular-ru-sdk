import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueInterceptor } from '@angular-ru/common/forms';
import { filter } from '@angular-ru/common/string';
import { Any } from '@angular-ru/common/typings';

@Directive({
    selector: '[filterCharacters]',
    providers: [ControlValueInterceptor]
})
export class FilterCharactersDirective implements OnInit {
    @Input() public filterCharacters: string[] = [];
    public preparedValue: string = '';

    constructor(
        private readonly interceptor: ControlValueInterceptor,
        private readonly elementRef: ElementRef<HTMLInputElement>
    ) {}

    public ngOnInit(): void {
        this.interceptor.attach({ toModelValue: this.filter() });
    }

    @HostListener('input', ['$event'])
    public onInput(): void {
        this.elementRef.nativeElement.value = this.preparedValue;
    }

    private filter(): Any {
        const directive: FilterCharactersDirective = this as FilterCharactersDirective;
        return (value: string): string => {
            directive.preparedValue = filter(value, directive.filterCharacters);
            return directive.preparedValue;
        };
    }
}
