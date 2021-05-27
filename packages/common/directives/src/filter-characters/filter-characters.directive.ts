import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Any } from '@angular-ru/common/typings';
import { filterCharacters } from '@angular-ru/common/utils';

import { ControlValueInterceptor } from '../../../forms/src/control-value-interceptor';

@Directive({
    selector: '[filterCharacters]',
    providers: [ControlValueInterceptor]
})
export class FilterCharactersDirective implements OnInit {
    @Input('filterCharacters')
    public characters: string[] = [];
    public preparedValue: string = '';

    constructor(
        private readonly interceptor: ControlValueInterceptor,
        private readonly elementRef: ElementRef<HTMLInputElement>
    ) {}

    public ngOnInit(): void {
        this.interceptor.attach({ toModelValue: this.filterCharacters() });
    }

    @HostListener('input', ['$event'])
    public onInput(): void {
        this.elementRef.nativeElement.value = this.preparedValue;
    }

    private filterCharacters(): Any {
        const directive: FilterCharactersDirective = this as FilterCharactersDirective;
        return (value: string): string => {
            directive.preparedValue = filterCharacters(value, directive.characters);
            return directive.preparedValue;
        };
    }
}
