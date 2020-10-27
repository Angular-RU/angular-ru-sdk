import { NgControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { AmountFormatDirective } from '@angular-ru/common/form';

describe('[TEST]: Amount separator', () => {
    it('should be correct formatted amount (disable decimals)', () => {
        let ngModelValue: string | number | undefined = '';

        const element: Partial<ElementRef<Partial<HTMLInputElement>>> = {
            nativeElement: { value: '' }
        };

        const control: Partial<NgControl> = {
            reset(value?: string | number): void {
                ngModelValue = value;
            }
        };

        const directive = new AmountFormatDirective(element as ElementRef, control as NgControl);

        directive.format();
        expect(element.nativeElement!.value).toEqual('');
        expect(ngModelValue).toEqual('');

        element.nativeElement!.value = '15000';
        directive.format();
        expect(element.nativeElement!.value).toEqual('15 000');
        expect(ngModelValue).toEqual(15000);

        element.nativeElement!.value = '-100,000';
        directive.format();
        expect(element.nativeElement!.value).toEqual('-100');
        expect(ngModelValue).toEqual(-100);

        element.nativeElement!.value = '-100.100';
        directive.format();
        expect(element.nativeElement!.value).toEqual('-100.1');
        expect(ngModelValue).toEqual(-100.1);

        element.nativeElement!.value = '199900,02000';
        directive.format();
        expect(element.nativeElement!.value).toEqual('199 900.02');
        expect(ngModelValue).toEqual(199900.02);

        element.nativeElement!.value = '9123.50';
        directive.format();
        expect(element.nativeElement!.value).toEqual('9 123.5');
        expect(ngModelValue).toEqual(9123.5);

        element.nativeElement!.value = '100,200,300';
        directive.format();
        expect(element.nativeElement!.value).toEqual('100.2');
        expect(ngModelValue).toEqual(100.2);

        element.nativeElement!.value = '-10000000000.0009';
        directive.format();
        expect(element.nativeElement!.value).toEqual('-10 000 000 000.001');
        expect(ngModelValue).toEqual(-10000000000.001);

        element.nativeElement!.value = 'ASD';
        directive.format();
        expect(element.nativeElement!.value).toEqual('');
        expect(ngModelValue).toEqual('');
    });

    it('should be correct formatted amount (decimals = 0)', () => {
        let ngModelValue: string | number | undefined = '';

        const element: Partial<ElementRef<Partial<HTMLInputElement>>> = {
            nativeElement: { value: '' }
        };

        const control: Partial<NgControl> = {
            reset(value?: string | number): void {
                ngModelValue = value;
            }
        };

        const directive = new AmountFormatDirective(element as ElementRef, control as NgControl);

        directive.maximumFractionDigits = 0;

        element.nativeElement!.value = '-100.100';
        directive.format();
        expect(element.nativeElement!.value).toEqual('-100');
        expect(ngModelValue).toEqual(-100);

        element.nativeElement!.value = '199900,02000';
        directive.format();
        expect(element.nativeElement!.value).toEqual('199 900');
        expect(ngModelValue).toEqual(199900);

        element.nativeElement!.value = '9123.50';
        directive.format();
        expect(element.nativeElement!.value).toEqual('9 124');
        expect(ngModelValue).toEqual(9124);

        element.nativeElement!.value = '100,200,300';
        directive.format();
        expect(element.nativeElement!.value).toEqual('100');
        expect(ngModelValue).toEqual(100);

        element.nativeElement!.value = '-10000000000.0009';
        directive.format();
        expect(element.nativeElement!.value).toEqual('-10 000 000 000');
        expect(ngModelValue).toEqual(-10000000000);

        element.nativeElement!.value = 'ASD';
        directive.format();
        expect(element.nativeElement!.value).toEqual('');
        expect(ngModelValue).toEqual('');
    });
});
