import { toStringVal } from '@angular-ru/common/string';
import { isNil } from '@angular-ru/common/utils';
import { AfterViewInit, Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Directive({ selector: '[amount-format]' })
export class AmountFormatDirective implements AfterViewInit {
    @Input('max-digits') public maximumFractionDigits: number | null = null;
    @Input('min-digits') public minimumFractionDigits: number | null = null;

    constructor(private readonly el: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

    private get element(): MatInput {
        return this.el.nativeElement;
    }

    private get value(): string {
        return toStringVal(this.element?.value).trim();
    }

    private get options(): Intl.NumberFormatOptions {
        const options: Intl.NumberFormatOptions = {};
        if (!isNil(this.maximumFractionDigits)) {
            options.maximumFractionDigits = this.maximumFractionDigits;
        }

        if (!isNil(this.minimumFractionDigits)) {
            options.minimumFractionDigits = this.minimumFractionDigits;
        }

        return options;
    }

    public ngAfterViewInit(): void {
        this.setup();
        this.format();
    }

    @HostListener('blur')
    public format(): void {
        if (!this.value) {
            return;
        }

        const stringValue: string = this.value.replace(/,/g, '.').replace(/(?!-)[^0-9.]/g, '');
        const numberValue: number = parseFloat(stringValue);

        if (isNaN(numberValue)) {
            this.ngControl?.reset('');
            this.element.value = '';
        } else {
            const formattedValue: string = numberValue.toLocaleString('en-EU', this.options).replace(/,/g, ' ');
            const modelValue: number = parseFloat(formattedValue.replace(/\s/g, ''));
            this.ngControl?.reset(modelValue);
            this.element.value = formattedValue;
        }
    }

    private setup(): void {
        this.el.nativeElement.setAttribute('type', 'text');
    }
}
