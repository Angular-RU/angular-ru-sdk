import { FormBuilder, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
    AmountFormatDirective,
    AmountFormatModule,
    AmountOptions,
    DEFAULT_AMOUNT_OPTIONS
} from '@angular-ru/common/directives';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('[TEST]: Amount format directive', () => {
    describe('expect without component', () => {
        let directive: AmountFormatDirective;
        let ngModelValue: string | number | undefined;
        let element: Partial<ElementRef<Partial<HTMLInputElement>>>;
        let control: Partial<NgControl>;

        beforeEach(() => {
            ngModelValue = '';

            element = {
                nativeElement: {
                    value: '',
                    setSelectionRange() {}
                }
            };

            control = {
                value: null,
                reset(value?: string | number): void {
                    // @ts-ignore
                    control['value'] = ngModelValue = value;
                }
            };

            // MOCK
            directive = new AmountFormatDirective(element as ElementRef, DEFAULT_AMOUNT_OPTIONS, control as NgControl);
        });

        describe('ru-RU', () => {
            describe('non numeric by ru-RU', () => {
                it('ngModel value is empty by ru-RU', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (ASD) to input by ru-RU', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (-500,000.000) to input by ru-RU', () => {
                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });
            });

            describe('integer, float by ru-RU', () => {
                it('convert `15000` to `15 000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('15 000');
                    expect(ngModelValue).toEqual(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100,000');
                    expect(ngModelValue).toEqual(-100);
                });

                it('represent the value `-100.100` in the model as `-100.1`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100,1');
                    expect(ngModelValue).toEqual(-100.1);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199 900,02');
                    expect(ngModelValue).toEqual(199900.02);
                });

                it('represent value `9123.50` as `9 123,5`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9 123,5');
                    expect(ngModelValue).toEqual(9123.5);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100,2');
                    expect(ngModelValue).toEqual(100.2);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10 000 000 000,001');
                    expect(ngModelValue).toEqual(-10000000000.001);
                });
            });

            describe('only integer by ru-RU', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = { lang: 'ru-RU', formatOptions: { maximumFractionDigits: 0 } };
                });

                it('convert `15000` to `15 000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('15 000');
                    expect(ngModelValue).toEqual(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100');
                    expect(ngModelValue).toEqual(-100);
                });

                it('represent the value `-100.100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100');
                    expect(ngModelValue).toEqual(-100);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199 900');
                    expect(ngModelValue).toEqual(199900);
                });

                it('represent value `9123.50` as `9 124`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9 124');
                    expect(ngModelValue).toEqual(9124);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100');
                    expect(ngModelValue).toEqual(100);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10 000 000 000');
                    expect(ngModelValue).toEqual(-10000000000);
                });
            });
        });

        describe('en-EU', () => {
            beforeEach(() => {
                // noinspection UnnecessaryLocalVariableJS
                const options: AmountOptions = { lang: 'en-EU' };
                directive.amountFormatOptions = options;
            });

            describe('non numeric by en-EU', () => {
                it('ngModel value is empty by en-EU', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (ASD) to input by en-EU', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (-500 000,000) to input by en-EU', () => {
                    element.nativeElement!.value = '-500 000,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-500,000,000');
                    expect(ngModelValue).toEqual(-500000000);
                });
            });

            describe('integer, float by en-EU', () => {
                it('convert `15000` to `15,000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('15,000');
                    expect(ngModelValue).toEqual(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100,000');
                    expect(ngModelValue).toEqual(-100000);

                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-500,000.000');
                    expect(ngModelValue).toEqual(-500000);
                });

                it('represent the value `-100.200` in the model as `-100.2`', () => {
                    element.nativeElement!.value = '-100.200';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100.200');
                    expect(ngModelValue).toEqual(-100.2);
                });

                it('use gaussian rounding for `0.03000`', () => {
                    element.nativeElement!.value = '199900.03000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199,900.03');
                    expect(ngModelValue).toEqual(199900.03);
                });

                it('represent value `9123.60` as `9,123.60`', () => {
                    element.nativeElement!.value = '9123.60';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9,123.60');
                    expect(ngModelValue).toEqual(9123.6);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100.2');
                    expect(ngModelValue).toEqual(100.2);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10,000,000,000.001');
                    expect(ngModelValue).toEqual(-10000000000.001);
                });
            });

            describe('only integer en-EU', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = { lang: 'en-EU', formatOptions: { maximumFractionDigits: 0 } };
                });

                it('convert `16000` to `16,000` for view value', () => {
                    element.nativeElement!.value = '16000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('16,000');
                    expect(ngModelValue).toEqual(16000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-200.000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-200');
                    expect(ngModelValue).toEqual(-200);
                });

                it('represent the value `-300.100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-300.100';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-300');
                    expect(ngModelValue).toEqual(-300);
                });

                it('use gaussian rounding for `0.04000`', () => {
                    element.nativeElement!.value = '199900.04000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199,900');
                    expect(ngModelValue).toEqual(199900);
                });

                it('represent value `9223.50` as `9,224`', () => {
                    element.nativeElement!.value = '9223.50';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9,224');
                    expect(ngModelValue).toEqual(9224);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100');
                    expect(ngModelValue).toEqual(100);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10,000,000,000');
                    expect(ngModelValue).toEqual(-10000000000);
                });
            });
        });

        describe('de-DE', () => {
            beforeEach(() => {
                // noinspection UnnecessaryLocalVariableJS
                const options: AmountOptions = { lang: 'de-DE' };
                directive.amountFormatOptions = options;
            });

            describe('non numeric by de-DE', () => {
                it('ngModel value is empty by de-DE', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (ASD) to input by de-DE', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (-500 000,000) to input by de-DE', () => {
                    element.nativeElement!.value = '-500 000,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-500.000,000');
                    expect(ngModelValue).toEqual(-500000);
                });
            });

            describe('integer, float by de-DE', () => {
                it('convert `15000` to `15.000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('15.000');
                    expect(ngModelValue).toEqual(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100.000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100.000');
                    expect(ngModelValue).toEqual(-100000);

                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-500,0');
                    expect(ngModelValue).toEqual(-500);
                });

                it('represent the value `-100,100` in the model as `-100,1`', () => {
                    element.nativeElement!.value = '-100,100';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100,100');
                    expect(ngModelValue).toEqual(-100.1);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199.900,02');
                    expect(ngModelValue).toEqual(199900.02);
                });

                it('represent value `9123,50` as `9.123,50`', () => {
                    element.nativeElement!.value = '9123,50';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9.123,50');
                    expect(ngModelValue).toEqual(9123.5);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100,2');
                    expect(ngModelValue).toEqual(100.2);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000,0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10.000.000.000,001');
                    expect(ngModelValue).toEqual(-10000000000.001);
                });
            });

            describe('only integer de-DE', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = { lang: 'de-DE', formatOptions: { maximumFractionDigits: 0 } };
                });

                it('convert `15000` to `15.000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('15.000');
                    expect(ngModelValue).toEqual(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100');
                    expect(ngModelValue).toEqual(-100);
                });

                it('represent the value `-100,100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-100,100';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100');
                    expect(ngModelValue).toEqual(-100);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199.900');
                    expect(ngModelValue).toEqual(199900);
                });

                it('represent value `9123,50` as `9,124`', () => {
                    element.nativeElement!.value = '9123,50';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9.124');
                    expect(ngModelValue).toEqual(9124);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100');
                    expect(ngModelValue).toEqual(100);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000,0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10.000.000.000');
                    expect(ngModelValue).toEqual(-10000000000);
                });
            });
        });

        describe('ja-JP', () => {
            beforeEach(() => {
                // noinspection UnnecessaryLocalVariableJS
                const options: AmountOptions = { lang: 'ja-JP' };
                directive.amountFormatOptions = options;
            });

            describe('non numeric by ja-JP', () => {
                it('ngModel value is empty by ja-JP', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (ASD) to input by ja-JP', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('');
                    expect(ngModelValue).toEqual(null);
                });

                it('set incorrect number value (-500 000,000) to input by ja-JP', () => {
                    element.nativeElement!.value = '-500 000,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-500,000,000');
                    expect(ngModelValue).toEqual(-500000000);
                });
            });

            describe('integer, float by ja-JP', () => {
                it('convert `15000` to `15,000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('15,000');
                    expect(ngModelValue).toEqual(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-200,000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-200,000');
                    expect(ngModelValue).toEqual(-200000);

                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-500,000.000');
                    expect(ngModelValue).toEqual(-500000);
                });

                it('represent the value `-100.100` in the model as `-100.1`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100.100');
                    expect(ngModelValue).toEqual(-100.1);
                });

                it('use gaussian rounding for `0.02000`', () => {
                    element.nativeElement!.value = '199900.02000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199,900.02');
                    expect(ngModelValue).toEqual(199900.02);
                });

                it('represent value `9123.50` as `9,123.50`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9,123.50');
                    expect(ngModelValue).toEqual(9123.5);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100.2');
                    expect(ngModelValue).toEqual(100.2);
                });

                it('use gaussian rounding for `0.0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10,000,000,000.001');
                    expect(ngModelValue).toEqual(-10000000000.001);
                });
            });

            describe('only integer ja-JP', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = { lang: 'ja-JP', formatOptions: { maximumFractionDigits: 0 } };
                });

                it('convert `15000` to `15,000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('15,000');
                    expect(ngModelValue).toEqual(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100.000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100');
                    expect(ngModelValue).toEqual(-100);
                });

                it('represent the value `-100.100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-100');
                    expect(ngModelValue).toEqual(-100);
                });

                it('use gaussian rounding for `0.02000`', () => {
                    element.nativeElement!.value = '199900.02000';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('199,900');
                    expect(ngModelValue).toEqual(199900);
                });

                it('represent value `9123.50` as `9,124`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('9,124');
                    expect(ngModelValue).toEqual(9124);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('100');
                    expect(ngModelValue).toEqual(100);
                });

                it('use gaussian rounding for `0.0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toEqual('-10,000,000,000');
                    expect(ngModelValue).toEqual(-10000000000);
                });
            });
        });

        describe('dynamic change language', () => {
            it('support recalculate without value', () => {
                expect(directive.amountFormatOptions.lang).toEqual('ru-RU');
                expect(directive.amountFormatOptions.formatOptions).toBeUndefined();

                // RU
                directive.format();
                expect(element.nativeElement!.value).toEqual('');
                expect(ngModelValue).toEqual(null);

                // EN
                directive.amountFormatOptions = { lang: 'en-EU' };
                expect(element.nativeElement!.value).toEqual('');
                expect(ngModelValue).toEqual(null);

                // DE
                directive.amountFormatOptions = { lang: 'de-DE' };
                expect(element.nativeElement!.value).toEqual('');
                expect(ngModelValue).toEqual(null);

                // JP
                directive.amountFormatOptions = { lang: 'ja-JP' };
                expect(element.nativeElement!.value).toEqual('');
                expect(ngModelValue).toEqual(null);

                // RU
                element.nativeElement!.value = '';
                directive.amountFormatOptions = { lang: 'ru-RU' };
                expect(element.nativeElement!.value).toEqual('');
                expect(ngModelValue).toEqual(null);
            });

            it('support recalculate format by integer, float', () => {
                expect(directive.amountFormatOptions.lang).toEqual('ru-RU');
                expect(directive.amountFormatOptions.formatOptions).toBeUndefined();

                // RU
                element.nativeElement!.value = '-500 000,050';
                directive.format();
                expect(element.nativeElement!.value).toEqual('-500 000,050');
                expect(ngModelValue).toEqual(-500000.05);

                // EN
                directive.amountFormatOptions = { lang: 'en-EU' };
                expect(element.nativeElement!.value).toEqual('-500,000.05');
                expect(ngModelValue).toEqual(-500000.05);

                // DE
                directive.amountFormatOptions = { lang: 'de-DE' };
                expect(element.nativeElement!.value).toEqual('-500.000,05');
                expect(ngModelValue).toEqual(-500000.05);

                // JP
                directive.amountFormatOptions = { lang: 'ja-JP' };
                expect(element.nativeElement!.value).toEqual('-500,000.05');
                expect(ngModelValue).toEqual(-500000.05);
            });

            it('support recalculate format by integer', () => {
                // RU
                element.nativeElement!.value = '-600 000,051';
                directive.format();
                expect(element.nativeElement!.value).toEqual('-600 000,051');
                expect(ngModelValue).toEqual(-600000.051);

                // EN
                directive.amountFormatOptions = { lang: 'en-EU', formatOptions: { maximumFractionDigits: 0 } };
                expect(element.nativeElement!.value).toEqual('-600,000');
                expect(ngModelValue).toEqual(-600000);

                // RU
                directive.setLang('ru-RU');
                directive.format();
                expect(element.nativeElement!.value).toEqual('-600 000');
                expect(ngModelValue).toEqual(-600000);

                element.nativeElement!.value = '-600 000,051';
                directive.format();
                expect(element.nativeElement!.value).toEqual('-600 000');
                expect(ngModelValue).toEqual(-600000);
            });
        });
    });

    describe('expect with component', () => {
        let fixture: ComponentFixture<HelloWorldComponent> | null = null;

        @Component({
            selector: 'hello-world',
            template: `
                <form [formGroup]="form">
                    <input amountFormat formControlName="amount" />
                </form>
            `
        })
        class HelloWorldComponent {
            @ViewChild(AmountFormatDirective)
            public directive!: AmountFormatDirective;

            public form: FormGroup = this.fb.group({
                amount: this.fb.control('INVALID_VALUE')
            });

            constructor(private readonly fb: FormBuilder) {}
        }

        function getInputViewValue(): string | undefined {
            return getInputRef()?.nativeElement.value;
        }

        function getInputModelValue(): number | string | undefined {
            return fixture?.componentInstance.form.value?.amount;
        }

        function getInputRef(): ElementRef<HTMLInputElement> | undefined {
            return fixture?.debugElement.query(By.css('input'));
        }

        function setInputViewValue(value: string, type: 'push' | 'reset' = 'reset'): void {
            const input = getInputRef();

            if (input) {
                if (type === 'reset') {
                    input.nativeElement.value = value;
                } else {
                    const current: string = input.nativeElement.value;
                    const position: number = input.nativeElement.selectionEnd ?? input.nativeElement.value.length;
                    input.nativeElement.value = `${current.slice(0, position)}${value}${current.slice(position)}`;
                    const newPosition = position + 1;
                    input.nativeElement.setSelectionRange(newPosition, newPosition);
                }

                input.nativeElement.dispatchEvent(new Event('input'));
                input.nativeElement.dispatchEvent(new Event('blur'));
            }

            fixture?.detectChanges();
        }

        function setInputSelectionPosition(cursorPosition: number): void {
            const input = getInputRef()?.nativeElement as HTMLInputElement;
            input.setSelectionRange(cursorPosition, cursorPosition);
            input.selectionStart = cursorPosition;
            input.selectionEnd = cursorPosition;
        }

        function getDirectiveInfo(): AmountFormatDirective | undefined {
            return fixture?.componentInstance.directive;
        }

        function getCursorPosition(): number | undefined {
            return getDirectiveInfo()?.getCursorPosition();
        }

        beforeEach(() =>
            TestBed.configureTestingModule({
                declarations: [HelloWorldComponent],
                imports: [AmountFormatModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule]
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(HelloWorldComponent);
            fixture.autoDetectChanges();
        });

        describe('change detection', () => {
            it('outside zone', () => {
                setInputViewValue('10000');
                expect(getInputViewValue()).toEqual('10 000');
                expect(getInputModelValue()).toEqual(10000);
                expect(getDirectiveInfo()?.isInAngularZone).toEqual(false);
            });
        });

        describe('ru-RU', () => {
            it('should be not dirty after first change detection', () => {
                expect(getDirectiveInfo()?.element.type).toEqual('text');
                expect(getDirectiveInfo()?.element.value).toEqual('');
                expect(getDirectiveInfo()?.dirty).toEqual(false);
            });

            it('should be empty default value', () => {
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);
            });

            it('should be reset wrong value', () => {
                setInputViewValue('a');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);
            });

            it('should skip invalid values `10abc`', () => {
                setInputViewValue('10abc');
                expect(getInputViewValue()).toEqual('10');
                expect(getInputModelValue()).toEqual(10);
            });

            it('should skip invalid values `10.20.30`', () => {
                setInputViewValue('10.20.30');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);
            });

            it('validation correct value by Ru', () => {
                setInputViewValue('10,24');
                expect(getInputViewValue()).toEqual('10,24');
                expect(getInputModelValue()).toEqual(10.24);
            });

            it('when given a value with negation', () => {
                setInputViewValue('-');
                expect(getInputViewValue()).toEqual('-');
                expect(getInputModelValue()).toEqual(null);

                setInputViewValue('-1');
                expect(getInputViewValue()).toEqual('-1');
                expect(getInputModelValue()).toEqual(-1);

                setInputViewValue('-12345678');
                expect(getInputViewValue()).toEqual('-12 345 678');
                expect(getInputModelValue()).toEqual(-12345678);

                setInputViewValue('-904241,25');
                expect(getInputViewValue()).toEqual('-904 241,25');
                expect(getInputModelValue()).toEqual(-904241.25);
            });

            it('should be correct detect cursor position', () => {
                setInputViewValue('1');
                expect(getInputViewValue()).toEqual('1');
                expect(getInputModelValue()).toEqual(1);
                expect(getCursorPosition()).toEqual(1);

                setInputViewValue('123456');
                expect(getInputViewValue()).toEqual('123 456');
                expect(getInputModelValue()).toEqual(123456);
                expect(getCursorPosition()).toEqual(7);

                setInputViewValue('12345678910');
                expect(getInputViewValue()).toEqual('12 345 678 910');
                expect(getInputModelValue()).toEqual(12345678910);
                expect(getCursorPosition()).toEqual(14);

                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toEqual('123 456 789 100');
                expect(getInputModelValue()).toEqual(123456789100);
                expect(getCursorPosition()).toEqual(15);

                setInputViewValue('7', 'push');
                expect(getInputViewValue()).toEqual('1 234 567 891 007');
                expect(getInputModelValue()).toEqual(1234567891007);
                expect(getCursorPosition()).toEqual(17);

                setInputSelectionPosition(5);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toEqual('12 340 567 891 007');
                expect(getInputModelValue()).toEqual(12340567891007);
                expect(getCursorPosition()).toEqual(6);

                setInputSelectionPosition(0);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toEqual('12 340 567 891 007');
                expect(getInputModelValue()).toEqual(12340567891007);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(0);
                setInputViewValue('8', 'push');
                expect(getInputViewValue()).toEqual('812 340 567 891 007');
                expect(getInputModelValue()).toEqual(812340567891007);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(0);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toEqual('812 340 567 891 007');
                expect(getInputModelValue()).toEqual(812340567891007);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(1);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toEqual('8,123');
                expect(getInputModelValue()).toEqual(8.123);
                expect(getCursorPosition()).toEqual(2);

                setInputSelectionPosition(0);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toEqual('8,123');
                expect(getInputModelValue()).toEqual(8.123);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(1);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toEqual('8,123');
                expect(getInputModelValue()).toEqual(8.123);
                expect(getCursorPosition()).toEqual(2);

                setInputViewValue('812340567891007');
                expect(getInputViewValue()).toEqual('812 340 567 891 007');
                expect(getInputModelValue()).toEqual(812340567891007);

                setInputSelectionPosition(8);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toEqual('812 340,568');
                expect(getInputModelValue()).toEqual(812340.568);
            });

            it('when setting an invalid value', () => {
                setInputViewValue('.');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);

                setInputViewValue(',');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);

                setInputViewValue('!');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);
            });

            it('when less than one', () => {
                setInputViewValue('0.');
                expect(getInputViewValue()).toEqual('0');
                expect(getInputModelValue()).toEqual(0);

                setInputViewValue('0.1');
                expect(getInputViewValue()).toEqual('0,1');
                expect(getInputModelValue()).toEqual(0.1);

                setInputViewValue('0.135');
                expect(getInputViewValue()).toEqual('0,135');
                expect(getInputModelValue()).toEqual(0.135);

                setInputViewValue('0.1357');
                expect(getInputViewValue()).toEqual('0,136');
                expect(getInputModelValue()).toEqual(0.136);
            });
        });

        describe('en-EU', () => {
            beforeEach(() => {
                getDirectiveInfo()?.setLang('en-EU');
            });

            it('should be not dirty after first change detection', () => {
                expect(getDirectiveInfo()?.element.type).toEqual('text');
                expect(getDirectiveInfo()?.element.value).toEqual('');
                expect(getDirectiveInfo()?.dirty).toEqual(false);
            });

            it('should be empty default value', () => {
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);
            });

            it('should be reset wrong value', () => {
                setInputViewValue('a');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);
            });

            it('should skip invalid values `10abc`', () => {
                setInputViewValue('10abc');
                expect(getInputViewValue()).toEqual('10');
                expect(getInputModelValue()).toEqual(10);
            });

            it('should skip invalid values `10.20.30`', () => {
                setInputViewValue('10.20.30');
                expect(getInputViewValue()).toEqual('10.203');
                expect(getInputModelValue()).toEqual(10.203);
            });

            it('validation correct value by EU', () => {
                setInputViewValue('10,24');
                expect(getInputViewValue()).toEqual('1,024');
                expect(getInputModelValue()).toEqual(1024);
            });

            it('when given a value with negation', () => {
                setInputViewValue('-');
                expect(getInputViewValue()).toEqual('-');
                expect(getInputModelValue()).toEqual(null);

                setInputViewValue('-1');
                expect(getInputViewValue()).toEqual('-1');
                expect(getInputModelValue()).toEqual(-1);

                setInputViewValue('-12345678');
                expect(getInputViewValue()).toEqual('-12,345,678');
                expect(getInputModelValue()).toEqual(-12345678);

                setInputViewValue('-904241.25');
                expect(getInputViewValue()).toEqual('-904,241.25');
                expect(getInputModelValue()).toEqual(-904241.25);
            });

            it('should be correct detect cursor position', () => {
                setInputViewValue('1');
                expect(getInputViewValue()).toEqual('1');
                expect(getInputModelValue()).toEqual(1);
                expect(getCursorPosition()).toEqual(1);

                setInputViewValue('123456');
                expect(getInputViewValue()).toEqual('123,456');
                expect(getInputModelValue()).toEqual(123456);
                expect(getCursorPosition()).toEqual(7);

                setInputViewValue('12345678910');
                expect(getInputViewValue()).toEqual('12,345,678,910');
                expect(getInputModelValue()).toEqual(12345678910);
                expect(getCursorPosition()).toEqual(14);

                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toEqual('123,456,789,100');
                expect(getInputModelValue()).toEqual(123456789100);
                expect(getCursorPosition()).toEqual(15);

                setInputViewValue('7', 'push');
                expect(getInputViewValue()).toEqual('1,234,567,891,007');
                expect(getInputModelValue()).toEqual(1234567891007);
                expect(getCursorPosition()).toEqual(17);

                setInputSelectionPosition(5);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toEqual('12,340,567,891,007');
                expect(getInputModelValue()).toEqual(12340567891007);
                expect(getCursorPosition()).toEqual(6);

                setInputSelectionPosition(0);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toEqual('12,340,567,891,007');
                expect(getInputModelValue()).toEqual(12340567891007);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(0);
                setInputViewValue('8', 'push');
                expect(getInputViewValue()).toEqual('812,340,567,891,007');
                expect(getInputModelValue()).toEqual(812340567891007);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(0);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toEqual('812,340,567,891,007');
                expect(getInputModelValue()).toEqual(812340567891007);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(1);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toEqual('8.123');
                expect(getInputModelValue()).toEqual(8.123);
                expect(getCursorPosition()).toEqual(2);

                setInputSelectionPosition(0);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toEqual('8.123');
                expect(getInputModelValue()).toEqual(8.123);
                expect(getCursorPosition()).toEqual(1);

                setInputSelectionPosition(1);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toEqual('8.123');
                expect(getInputModelValue()).toEqual(8.123);
                expect(getCursorPosition()).toEqual(2);

                setInputViewValue('812340567891007');
                expect(getInputViewValue()).toEqual('812,340,567,891,007');
                expect(getInputModelValue()).toEqual(812340567891007);

                setInputSelectionPosition(8);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toEqual('812,340.568');
                expect(getInputModelValue()).toEqual(812340.568);
            });

            it('when setting an invalid value', () => {
                setInputViewValue('.');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);

                setInputViewValue(',');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);

                setInputViewValue('!');
                expect(getInputViewValue()).toEqual('');
                expect(getInputModelValue()).toEqual(null);
            });

            it('when less than one', () => {
                setInputViewValue('0.');
                expect(getInputViewValue()).toEqual('0');
                expect(getInputModelValue()).toEqual(0);

                setInputViewValue('0.1');
                expect(getInputViewValue()).toEqual('0.1');
                expect(getInputModelValue()).toEqual(0.1);

                setInputViewValue('0.135');
                expect(getInputViewValue()).toEqual('0.135');
                expect(getInputModelValue()).toEqual(0.135);

                setInputViewValue('0.1357');
                expect(getInputViewValue()).toEqual('0.136');
                expect(getInputModelValue()).toEqual(0.136);
            });
        });
    });
});
