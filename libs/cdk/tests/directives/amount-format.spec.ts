import {CommonModule} from '@angular/common';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    NgControl,
    ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {
    AmountFormatDirective,
    AmountFormatModule,
    AmountOptions,
    DEFAULT_AMOUNT_OPTIONS,
} from '@angular-ru/cdk/directives';
import {Nullable} from '@angular-ru/cdk/typings';

describe('[TEST]: Amount format directive', () => {
    describe('expect without component', () => {
        let directive: AmountFormatDirective;
        let ngModelValue: Nullable<number | string>;
        let element: Partial<ElementRef<Partial<HTMLInputElement>>>;
        let control: Partial<NgControl>;

        beforeEach(() => {
            ngModelValue = '';

            element = {
                nativeElement: {
                    value: '',
                    setSelectionRange() {
                        // ...
                    },
                },
            };

            control = {
                value: null,
                reset(value?: number | string): void {
                    // @ts-ignore
                    control.value = ngModelValue = value;
                },
            };

            // MOCK
            directive = new AmountFormatDirective(
                element as ElementRef,
                DEFAULT_AMOUNT_OPTIONS,
                control as NgControl,
            );
        });

        describe('ru-RU', () => {
            describe('non numeric by ru-RU', () => {
                it('ngModel value is empty by ru-RU', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (ASD) to input by ru-RU', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (-500,000.000) to input by ru-RU', () => {
                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });
            });

            describe('integer, float by ru-RU', () => {
                it('convert `15000` to `15 000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('15 000');
                    expect(ngModelValue).toBe(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100,000');
                    expect(ngModelValue).toBe(-100);
                });

                it('represent the value `-100.100` in the model as `-100.1`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100,1');
                    expect(ngModelValue).toBe(-100.1);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199 900,02');
                    expect(ngModelValue).toBe(199900.02);
                });

                it('represent value `9123.50` as `9 123,5`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9 123,5');
                    expect(ngModelValue).toBe(9123.5);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100,2');
                    expect(ngModelValue).toBe(100.2);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10 000 000 000,001');
                    expect(ngModelValue).toBe(-10000000000.001);
                });
            });

            describe('only integer by ru-RU', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = {
                        lang: 'ru-RU',
                        formatOptions: {maximumFractionDigits: 0},
                    };
                });

                it('convert `15000` to `15 000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('15 000');
                    expect(ngModelValue).toBe(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100');
                    expect(ngModelValue).toBe(-100);
                });

                it('represent the value `-100.100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100');
                    expect(ngModelValue).toBe(-100);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199 900');
                    expect(ngModelValue).toBe(199900);
                });

                it('represent value `9123.50` as `9 124`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9 124');
                    expect(ngModelValue).toBe(9124);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100');
                    expect(ngModelValue).toBe(100);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10 000 000 000');
                    expect(ngModelValue).toBe(-10000000000);
                });
            });
        });

        describe('en-EU', () => {
            beforeEach(() => {
                // noinspection UnnecessaryLocalVariableJS
                const options: AmountOptions = {lang: 'en-EU'};

                directive.amountFormatOptions = options;
            });

            describe('non numeric by en-EU', () => {
                it('ngModel value is empty by en-EU', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (ASD) to input by en-EU', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (-500 000,000) to input by en-EU', () => {
                    element.nativeElement!.value = '-500 000,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-500,000,000');
                    expect(ngModelValue).toBe(-500000000);
                });
            });

            describe('integer, float by en-EU', () => {
                it('convert `15000` to `15,000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('15,000');
                    expect(ngModelValue).toBe(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100,000');
                    expect(ngModelValue).toBe(-100000);

                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-500,000.000');
                    expect(ngModelValue).toBe(-500000);
                });

                it('represent the value `-100.200` in the model as `-100.2`', () => {
                    element.nativeElement!.value = '-100.200';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100.200');
                    expect(ngModelValue).toBe(-100.2);
                });

                it('use gaussian rounding for `0.03000`', () => {
                    element.nativeElement!.value = '199900.03000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199,900.03');
                    expect(ngModelValue).toBe(199900.03);
                });

                it('represent value `9123.60` as `9,123.60`', () => {
                    element.nativeElement!.value = '9123.60';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9,123.60');
                    expect(ngModelValue).toBe(9123.6);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100.2');
                    expect(ngModelValue).toBe(100.2);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10,000,000,000.001');
                    expect(ngModelValue).toBe(-10000000000.001);
                });
            });

            describe('only integer en-EU', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = {
                        lang: 'en-EU',
                        formatOptions: {maximumFractionDigits: 0},
                    };
                });

                it('convert `16000` to `16,000` for view value', () => {
                    element.nativeElement!.value = '16000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('16,000');
                    expect(ngModelValue).toBe(16000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-200.000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-200');
                    expect(ngModelValue).toBe(-200);
                });

                it('represent the value `-300.100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-300.100';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-300');
                    expect(ngModelValue).toBe(-300);
                });

                it('use gaussian rounding for `0.04000`', () => {
                    element.nativeElement!.value = '199900.04000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199,900');
                    expect(ngModelValue).toBe(199900);
                });

                it('represent value `9223.50` as `9,224`', () => {
                    element.nativeElement!.value = '9223.50';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9,224');
                    expect(ngModelValue).toBe(9224);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100');
                    expect(ngModelValue).toBe(100);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10,000,000,000');
                    expect(ngModelValue).toBe(-10000000000);
                });
            });
        });

        describe('de-DE', () => {
            beforeEach(() => {
                // noinspection UnnecessaryLocalVariableJS
                const options: AmountOptions = {lang: 'de-DE'};

                directive.amountFormatOptions = options;
            });

            describe('non numeric by de-DE', () => {
                it('ngModel value is empty by de-DE', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (ASD) to input by de-DE', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (-500 000,000) to input by de-DE', () => {
                    element.nativeElement!.value = '-500 000,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-500.000,000');
                    expect(ngModelValue).toBe(-500000);
                });
            });

            describe('integer, float by de-DE', () => {
                it('convert `15000` to `15.000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('15.000');
                    expect(ngModelValue).toBe(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100.000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100.000');
                    expect(ngModelValue).toBe(-100000);

                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-500,0');
                    expect(ngModelValue).toBe(-500);
                });

                it('represent the value `-100,100` in the model as `-100,1`', () => {
                    element.nativeElement!.value = '-100,100';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100,100');
                    expect(ngModelValue).toBe(-100.1);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199.900,02');
                    expect(ngModelValue).toBe(199900.02);
                });

                it('represent value `9123,50` as `9.123,50`', () => {
                    element.nativeElement!.value = '9123,50';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9.123,50');
                    expect(ngModelValue).toBe(9123.5);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100,2');
                    expect(ngModelValue).toBe(100.2);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000,0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10.000.000.000,001');
                    expect(ngModelValue).toBe(-10000000000.001);
                });
            });

            describe('only integer de-DE', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = {
                        lang: 'de-DE',
                        formatOptions: {maximumFractionDigits: 0},
                    };
                });

                it('convert `15000` to `15.000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('15.000');
                    expect(ngModelValue).toBe(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100');
                    expect(ngModelValue).toBe(-100);
                });

                it('represent the value `-100,100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-100,100';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100');
                    expect(ngModelValue).toBe(-100);
                });

                it('use gaussian rounding for `0,02000`', () => {
                    element.nativeElement!.value = '199900,02000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199.900');
                    expect(ngModelValue).toBe(199900);
                });

                it('represent value `9123,50` as `9,124`', () => {
                    element.nativeElement!.value = '9123,50';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9.124');
                    expect(ngModelValue).toBe(9124);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100,200,300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100');
                    expect(ngModelValue).toBe(100);
                });

                it('use gaussian rounding for `0,0009`', () => {
                    element.nativeElement!.value = '-10000000000,0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10.000.000.000');
                    expect(ngModelValue).toBe(-10000000000);
                });
            });
        });

        describe('ja-JP', () => {
            beforeEach(() => {
                // noinspection UnnecessaryLocalVariableJS
                const options: AmountOptions = {lang: 'ja-JP'};

                directive.amountFormatOptions = options;
            });

            describe('non numeric by ja-JP', () => {
                it('ngModel value is empty by ja-JP', () => {
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (ASD) to input by ja-JP', () => {
                    element.nativeElement!.value = 'ASD';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('');
                    expect(ngModelValue).toBeNull();
                });

                it('set incorrect number value (-500 000,000) to input by ja-JP', () => {
                    element.nativeElement!.value = '-500 000,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-500,000,000');
                    expect(ngModelValue).toBe(-500000000);
                });
            });

            describe('integer, float by ja-JP', () => {
                it('convert `15000` to `15,000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('15,000');
                    expect(ngModelValue).toBe(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-200,000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-200,000');
                    expect(ngModelValue).toBe(-200000);

                    element.nativeElement!.value = '-500,000.000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-500,000.000');
                    expect(ngModelValue).toBe(-500000);
                });

                it('represent the value `-100.100` in the model as `-100.1`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100.100');
                    expect(ngModelValue).toBe(-100.1);
                });

                it('use gaussian rounding for `0.02000`', () => {
                    element.nativeElement!.value = '199900.02000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199,900.02');
                    expect(ngModelValue).toBe(199900.02);
                });

                it('represent value `9123.50` as `9,123.50`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9,123.50');
                    expect(ngModelValue).toBe(9123.5);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100.2');
                    expect(ngModelValue).toBe(100.2);
                });

                it('use gaussian rounding for `0.0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10,000,000,000.001');
                    expect(ngModelValue).toBe(-10000000000.001);
                });
            });

            describe('only integer ja-JP', () => {
                beforeEach(() => {
                    directive.amountFormatOptions = {
                        lang: 'ja-JP',
                        formatOptions: {maximumFractionDigits: 0},
                    };
                });

                it('convert `15000` to `15,000` for view value', () => {
                    element.nativeElement!.value = '15000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('15,000');
                    expect(ngModelValue).toBe(15000);
                });

                it('trim the value when there are only zeros after the decimal point', () => {
                    element.nativeElement!.value = '-100.000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100');
                    expect(ngModelValue).toBe(-100);
                });

                it('represent the value `-100.100` in the model as `-100`', () => {
                    element.nativeElement!.value = '-100.100';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-100');
                    expect(ngModelValue).toBe(-100);
                });

                it('use gaussian rounding for `0.02000`', () => {
                    element.nativeElement!.value = '199900.02000';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('199,900');
                    expect(ngModelValue).toBe(199900);
                });

                it('represent value `9123.50` as `9,124`', () => {
                    element.nativeElement!.value = '9123.50';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('9,124');
                    expect(ngModelValue).toBe(9124);
                });

                it('what happens if we are specify incorrect separators', () => {
                    element.nativeElement!.value = '100.200.300';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('100');
                    expect(ngModelValue).toBe(100);
                });

                it('use gaussian rounding for `0.0009`', () => {
                    element.nativeElement!.value = '-10000000000.0009';
                    directive.format();
                    expect(element.nativeElement!.value).toBe('-10,000,000,000');
                    expect(ngModelValue).toBe(-10000000000);
                });
            });
        });

        describe('dynamic change language', () => {
            it('support recalculate without value', () => {
                expect(directive.amountFormatOptions.lang).toBe('ru-RU');
                expect(directive.amountFormatOptions.formatOptions).toBeUndefined();

                // RU
                directive.format();
                expect(element.nativeElement!.value).toBe('');
                expect(ngModelValue).toBeNull();

                // EN
                directive.amountFormatOptions = {lang: 'en-EU'};
                expect(element.nativeElement!.value).toBe('');
                expect(ngModelValue).toBeNull();

                // DE
                directive.amountFormatOptions = {lang: 'de-DE'};
                expect(element.nativeElement!.value).toBe('');
                expect(ngModelValue).toBeNull();

                // JP
                directive.amountFormatOptions = {lang: 'ja-JP'};
                expect(element.nativeElement!.value).toBe('');
                expect(ngModelValue).toBeNull();

                // RU
                element.nativeElement!.value = '';
                directive.amountFormatOptions = {lang: 'ru-RU'};
                expect(element.nativeElement!.value).toBe('');
                expect(ngModelValue).toBeNull();
            });

            it('support recalculate format by integer, float', () => {
                expect(directive.amountFormatOptions.lang).toBe('ru-RU');
                expect(directive.amountFormatOptions.formatOptions).toBeUndefined();

                // RU
                element.nativeElement!.value = '-500 000,050';
                directive.format();
                expect(element.nativeElement!.value).toBe('-500 000,050');
                expect(ngModelValue).toBe(-500000.05);

                // EN
                directive.amountFormatOptions = {lang: 'en-EU'};
                expect(element.nativeElement!.value).toBe('-500,000.05');
                expect(ngModelValue).toBe(-500000.05);

                // DE
                directive.amountFormatOptions = {lang: 'de-DE'};
                expect(element.nativeElement!.value).toBe('-500.000,05');
                expect(ngModelValue).toBe(-500000.05);

                // JP
                directive.amountFormatOptions = {lang: 'ja-JP'};
                expect(element.nativeElement!.value).toBe('-500,000.05');
                expect(ngModelValue).toBe(-500000.05);
            });

            it('support recalculate format by integer', () => {
                // RU
                element.nativeElement!.value = '-600 000,051';
                directive.format();
                expect(element.nativeElement!.value).toBe('-600 000,051');
                expect(ngModelValue).toBe(-600000.051);

                // EN
                directive.amountFormatOptions = {
                    lang: 'en-EU',
                    formatOptions: {maximumFractionDigits: 0},
                };
                expect(element.nativeElement!.value).toBe('-600,000');
                expect(ngModelValue).toBe(-600000);

                // RU
                directive.setLang('ru-RU');
                directive.format();
                expect(element.nativeElement!.value).toBe('-600 000');
                expect(ngModelValue).toBe(-600000);

                element.nativeElement!.value = '-600 000,051';
                directive.format();
                expect(element.nativeElement!.value).toBe('-600 000');
                expect(ngModelValue).toBe(-600000);
            });
        });
    });

    describe('expect with component', function () {
        let fixture: Nullable<ComponentFixture<HelloWorldComponent>> = null;

        @Component({
            selector: 'hello-world',
            template: `
                <form [formGroup]="form">
                    <input
                        amountFormat
                        formControlName="amount"
                    />
                </form>
            `,
        })
        class HelloWorldComponent {
            @ViewChild(AmountFormatDirective)
            public directive!: AmountFormatDirective;

            public form: FormGroup = this.fb.group({
                amount: this.fb.control('INVALID_VALUE'),
            });

            constructor(private readonly fb: FormBuilder) {}
        }

        function getInputViewValue(): Nullable<string> {
            return getInputRef()?.nativeElement.value;
        }

        function getInputModelValue(): Nullable<number | string> {
            return fixture?.componentInstance.form.value?.amount;
        }

        function getInputRef(): Nullable<ElementRef<HTMLInputElement>> {
            return fixture?.debugElement.query(By.css('input'));
        }

        function setInputViewValue(
            value: string,
            type: 'push' | 'reset' = 'reset',
            emitBlur = true,
        ): void {
            const input = getInputRef();

            if (input) {
                if (type === 'reset') {
                    input.nativeElement.value = value;
                } else {
                    const current: string = input.nativeElement.value;
                    const position: number =
                        input.nativeElement.selectionEnd ??
                        input.nativeElement.value.length;

                    input.nativeElement.value = `${current.slice(0, position)}${value}${current.slice(position)}`;
                    const newPosition = position + 1;

                    input.nativeElement.setSelectionRange(newPosition, newPosition);
                }

                input.nativeElement.dispatchEvent(new Event('input'));

                if (emitBlur) {
                    input.nativeElement.dispatchEvent(new Event('blur'));
                }
            }

            fixture?.detectChanges();
        }

        function setInputSelectionPosition(cursorPosition: number): void {
            const input = getInputRef()?.nativeElement as HTMLInputElement;

            input.setSelectionRange(cursorPosition, cursorPosition);
            input.selectionStart = cursorPosition;
            input.selectionEnd = cursorPosition;
        }

        function getDirectiveInfo(): Nullable<AmountFormatDirective> {
            return fixture?.componentInstance.directive;
        }

        function getCursorPosition(): Nullable<number> {
            return getDirectiveInfo()?.getCursorPosition();
        }

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [HelloWorldComponent],
                imports: [
                    AmountFormatModule.forRoot(),
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
            });

            fixture = TestBed.createComponent(HelloWorldComponent);
            fixture.autoDetectChanges();
        });

        describe('change detection', () => {
            it('outside zone', () => {
                setInputViewValue('10000');
                expect(getInputViewValue()).toBe('10 000');
                expect(getInputModelValue()).toBe(10000);
                expect(getDirectiveInfo()?.isInAngularZone).toBe(false);
            });
        });

        describe('ru-RU', () => {
            describe('without emit blur by ru-RU', () => {
                it('what happens if we are specify separators', () => {
                    setInputViewValue('100000', 'reset', false);
                    expect(getInputViewValue()).toBe('100 000');
                    expect(getInputModelValue()).toBe(100000);

                    setInputViewValue(',', 'push', false);
                    expect(getInputViewValue()).toBe('100 000,');
                    expect(getInputModelValue()).toBe(100000);

                    getInputRef()?.nativeElement.dispatchEvent(new Event('blur'));

                    expect(getInputViewValue()).toBe('100 000');
                    expect(getInputModelValue()).toBe(100000);
                });
            });

            it('should be not dirty after first change detection', () => {
                expect(getDirectiveInfo()?.element.type).toBe('text');
                expect(getDirectiveInfo()?.element.value).toBe('');
                expect(getDirectiveInfo()?.dirty).toBe(false);
            });

            it('should be empty default value', () => {
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();
            });

            it('should be reset wrong value', () => {
                setInputViewValue('a');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();
            });

            it('should skip invalid values `10abc`', () => {
                setInputViewValue('10abc');
                expect(getInputViewValue()).toBe('10');
                expect(getInputModelValue()).toBe(10);
            });

            it('should skip invalid values `10.20.30`', () => {
                setInputViewValue('10.20.30');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();
            });

            it('validation correct value by Ru', () => {
                setInputViewValue('10,24');
                expect(getInputViewValue()).toBe('10,24');
                expect(getInputModelValue()).toBe(10.24);
            });

            it('when given a value with negation', () => {
                setInputViewValue('-', 'reset', false);
                expect(getInputViewValue()).toBe('-');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue('-', 'reset', true);
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue('-1');
                expect(getInputViewValue()).toBe('-1');
                expect(getInputModelValue()).toBe(-1);

                setInputViewValue('-12345678');
                expect(getInputViewValue()).toBe('-12 345 678');
                expect(getInputModelValue()).toBe(-12345678);

                setInputViewValue('-904241,25');
                expect(getInputViewValue()).toBe('-904 241,25');
                expect(getInputModelValue()).toBe(-904241.25);
            });

            it('should be correct detect cursor position', () => {
                setInputViewValue('1');
                expect(getInputViewValue()).toBe('1');
                expect(getInputModelValue()).toBe(1);
                expect(getCursorPosition()).toBe(1);

                setInputViewValue('123456');
                expect(getInputViewValue()).toBe('123 456');
                expect(getInputModelValue()).toBe(123456);
                expect(getCursorPosition()).toBe(7);

                setInputViewValue('12345678910');
                expect(getInputViewValue()).toBe('12 345 678 910');
                expect(getInputModelValue()).toBe(12345678910);
                expect(getCursorPosition()).toBe(14);

                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toBe('123 456 789 100');
                expect(getInputModelValue()).toBe(123456789100);
                expect(getCursorPosition()).toBe(15);

                setInputViewValue('7', 'push');
                expect(getInputViewValue()).toBe('1 234 567 891 007');
                expect(getInputModelValue()).toBe(1234567891007);
                expect(getCursorPosition()).toBe(17);

                setInputSelectionPosition(5);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toBe('12 340 567 891 007');
                expect(getInputModelValue()).toBe(12340567891007);
                expect(getCursorPosition()).toBe(6);

                setInputSelectionPosition(0);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toBe('12 340 567 891 007');
                expect(getInputModelValue()).toBe(12340567891007);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(0);
                setInputViewValue('8', 'push');
                expect(getInputViewValue()).toBe('812 340 567 891 007');
                expect(getInputModelValue()).toBe(812340567891007);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(0);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toBe('812 340 567 891 007');
                expect(getInputModelValue()).toBe(812340567891007);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(1);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toBe('8,123');
                expect(getInputModelValue()).toBe(8.123);
                expect(getCursorPosition()).toBe(2);

                setInputSelectionPosition(0);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toBe('8,123');
                expect(getInputModelValue()).toBe(8.123);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(1);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toBe('8,123');
                expect(getInputModelValue()).toBe(8.123);
                expect(getCursorPosition()).toBe(2);

                setInputViewValue('812340567891007');
                expect(getInputViewValue()).toBe('812 340 567 891 007');
                expect(getInputModelValue()).toBe(812340567891007);

                setInputSelectionPosition(8);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toBe('812 340,568');
                expect(getInputModelValue()).toBe(812340.568);
            });

            it('when setting an invalid value', () => {
                setInputViewValue('.');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue(',');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue('!');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();
            });

            it('when less than one', () => {
                setInputViewValue('0.');
                expect(getInputViewValue()).toBe('0');
                expect(getInputModelValue()).toBe(0);

                setInputViewValue('0.1');
                expect(getInputViewValue()).toBe('0,1');
                expect(getInputModelValue()).toBe(0.1);

                setInputViewValue('0.135');
                expect(getInputViewValue()).toBe('0,135');
                expect(getInputModelValue()).toBe(0.135);

                setInputViewValue('0.1357');
                expect(getInputViewValue()).toBe('0,136');
                expect(getInputModelValue()).toBe(0.136);
            });
        });

        describe('en-EU', () => {
            beforeEach(() => {
                getDirectiveInfo()?.setLang('en-EU');
            });

            describe('without emit blur', () => {
                it('what happens if we are specify separators by en-EU', () => {
                    setInputViewValue('100000', 'reset', false);
                    expect(getInputViewValue()).toBe('100,000');
                    expect(getInputModelValue()).toBe(100000);

                    setInputViewValue('.', 'push', false);
                    expect(getInputViewValue()).toBe('100,000.');
                    expect(getInputModelValue()).toBe(100000);

                    getInputRef()?.nativeElement.dispatchEvent(new Event('blur'));

                    expect(getInputViewValue()).toBe('100,000');
                    expect(getInputModelValue()).toBe(100000);
                });
            });

            it('should be not dirty after first change detection', () => {
                expect(getDirectiveInfo()?.element.type).toBe('text');
                expect(getDirectiveInfo()?.element.value).toBe('');
                expect(getDirectiveInfo()?.dirty).toBe(false);
            });

            it('should be empty default value', () => {
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();
            });

            it('should be reset wrong value', () => {
                setInputViewValue('a');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();
            });

            it('should skip invalid values `10abc`', () => {
                setInputViewValue('10abc');
                expect(getInputViewValue()).toBe('10');
                expect(getInputModelValue()).toBe(10);
            });

            it('should skip invalid values `10.20.30`', () => {
                setInputViewValue('10.20.30');
                expect(getInputViewValue()).toBe('10.203');
                expect(getInputModelValue()).toBe(10.203);
            });

            it('validation correct value by EU', () => {
                setInputViewValue('10,24');
                expect(getInputViewValue()).toBe('1,024');
                expect(getInputModelValue()).toBe(1024);
            });

            it('when given a value with negation', () => {
                setInputViewValue('-', 'reset', false);
                expect(getInputViewValue()).toBe('-');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue('-', 'reset', true);
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue('-1');
                expect(getInputViewValue()).toBe('-1');
                expect(getInputModelValue()).toBe(-1);

                setInputViewValue('-12345678');
                expect(getInputViewValue()).toBe('-12,345,678');
                expect(getInputModelValue()).toBe(-12345678);

                setInputViewValue('-904241.25');
                expect(getInputViewValue()).toBe('-904,241.25');
                expect(getInputModelValue()).toBe(-904241.25);
            });

            it('should be correct detect cursor position', () => {
                setInputViewValue('1');
                expect(getInputViewValue()).toBe('1');
                expect(getInputModelValue()).toBe(1);
                expect(getCursorPosition()).toBe(1);

                setInputViewValue('123456');
                expect(getInputViewValue()).toBe('123,456');
                expect(getInputModelValue()).toBe(123456);
                expect(getCursorPosition()).toBe(7);

                setInputViewValue('12345678910');
                expect(getInputViewValue()).toBe('12,345,678,910');
                expect(getInputModelValue()).toBe(12345678910);
                expect(getCursorPosition()).toBe(14);

                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toBe('123,456,789,100');
                expect(getInputModelValue()).toBe(123456789100);
                expect(getCursorPosition()).toBe(15);

                setInputViewValue('7', 'push');
                expect(getInputViewValue()).toBe('1,234,567,891,007');
                expect(getInputModelValue()).toBe(1234567891007);
                expect(getCursorPosition()).toBe(17);

                setInputSelectionPosition(5);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toBe('12,340,567,891,007');
                expect(getInputModelValue()).toBe(12340567891007);
                expect(getCursorPosition()).toBe(6);

                setInputSelectionPosition(0);
                setInputViewValue('0', 'push');
                expect(getInputViewValue()).toBe('12,340,567,891,007');
                expect(getInputModelValue()).toBe(12340567891007);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(0);
                setInputViewValue('8', 'push');
                expect(getInputViewValue()).toBe('812,340,567,891,007');
                expect(getInputModelValue()).toBe(812340567891007);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(0);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toBe('812,340,567,891,007');
                expect(getInputModelValue()).toBe(812340567891007);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(1);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toBe('8.123');
                expect(getInputModelValue()).toBe(8.123);
                expect(getCursorPosition()).toBe(2);

                setInputSelectionPosition(0);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toBe('8.123');
                expect(getInputModelValue()).toBe(8.123);
                expect(getCursorPosition()).toBe(1);

                setInputSelectionPosition(1);
                setInputViewValue(',', 'push');
                expect(getInputViewValue()).toBe('8.123');
                expect(getInputModelValue()).toBe(8.123);
                expect(getCursorPosition()).toBe(2);

                setInputViewValue('812340567891007');
                expect(getInputViewValue()).toBe('812,340,567,891,007');
                expect(getInputModelValue()).toBe(812340567891007);

                setInputSelectionPosition(8);
                setInputViewValue('.', 'push');
                expect(getInputViewValue()).toBe('812,340.568');
                expect(getInputModelValue()).toBe(812340.568);
            });

            it('when setting an invalid value', () => {
                setInputViewValue('.');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue(',');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();

                setInputViewValue('!');
                expect(getInputViewValue()).toBe('');
                expect(getInputModelValue()).toBeNull();
            });

            it('when less than one', () => {
                setInputViewValue('0.');
                expect(getInputViewValue()).toBe('0');
                expect(getInputModelValue()).toBe(0);

                setInputViewValue('0.1');
                expect(getInputViewValue()).toBe('0.1');
                expect(getInputModelValue()).toBe(0.1);

                setInputViewValue('0.135');
                expect(getInputViewValue()).toBe('0.135');
                expect(getInputModelValue()).toBe(0.135);

                setInputViewValue('0.1357');
                expect(getInputViewValue()).toBe('0.136');
                expect(getInputModelValue()).toBe(0.136);
            });
        });
    });
});
