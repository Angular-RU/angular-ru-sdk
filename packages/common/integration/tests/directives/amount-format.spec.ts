import { FormBuilder, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
    AmountFormatDirective,
    AmountFormatDirectiveModule,
    AmountFormatSegments
} from '@angular-ru/common/directives';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Immutable } from '@angular-ru/common/typings';
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
                reset(value?: string | number): void {
                    ngModelValue = value;
                }
            };

            directive = new AmountFormatDirective(element as ElementRef, control as NgControl);
        });

        it('should be correct formatted amount (disable decimals)', () => {
            directive.format();
            expect(element.nativeElement!.value).toEqual('');
            expect(ngModelValue).toEqual(null);

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
            expect(ngModelValue).toEqual(null);
        });

        it('should be correct formatted amount (decimals = 0)', () => {
            directive.amountFormatOptions = { lang: 'ru-RU', formatOptions: { maximumFractionDigits: 0 } };

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
            expect(ngModelValue).toEqual(null);
        });
    });

    describe('expect with component', () => {
        let fixture: ComponentFixture<HelloWorldComponent> | null = null;

        @Component({
            selector: 'hello-world',
            template: `
                <form [formGroup]="form">
                    <input amountFormatOptions formControlName="amount" />
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

        beforeEach(() =>
            TestBed.configureTestingModule({
                declarations: [HelloWorldComponent],
                imports: [AmountFormatDirectiveModule, CommonModule, FormsModule, ReactiveFormsModule]
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(HelloWorldComponent);
            fixture.autoDetectChanges();
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

        it('should skip invalid values', () => {
            setInputViewValue('10abc');
            expect(getInputViewValue()).toEqual('10');
            expect(getInputModelValue()).toEqual(10);

            setInputViewValue('10.20.30');
            expect(getInputViewValue()).toEqual('10.2');
            expect(getInputModelValue()).toEqual(10.2);

            setInputViewValue('10,24');
            expect(getInputViewValue()).toEqual('10.24');
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
            expect(getInputViewValue()).toEqual('-904 241.25');
            expect(getInputModelValue()).toEqual(-904241.25);
        });

        it('should be correct detect cursor position', () => {
            setInputViewValue('1');
            expect(getInputViewValue()).toEqual('1');
            expect(getInputModelValue()).toEqual(1);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 1,
                spaces: { before: 0, after: 0, newAdded: 0 }
            });

            setInputViewValue('123456');
            expect(getInputViewValue()).toEqual('123 456');
            expect(getInputModelValue()).toEqual(123456);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 7,
                spaces: { before: 0, after: 1, newAdded: 1 }
            });

            setInputViewValue('12345678910');
            expect(getInputViewValue()).toEqual('12 345 678 910');
            expect(getInputModelValue()).toEqual(12345678910);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 14,
                spaces: { before: 0, after: 3, newAdded: 3 }
            });

            setInputViewValue('0', 'push');
            expect(getInputViewValue()).toEqual('123 456 789 100');
            expect(getInputModelValue()).toEqual(123456789100);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 15,
                spaces: { before: 3, after: 3, newAdded: 0 }
            });

            setInputViewValue('7', 'push');
            expect(getInputViewValue()).toEqual('1 234 567 891 007');
            expect(getInputModelValue()).toEqual(1234567891007);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 17,
                spaces: { before: 3, after: 4, newAdded: 1 }
            });

            setInputSelectionPosition(5);
            setInputViewValue('0', 'push');
            expect(getInputViewValue()).toEqual('12 340 567 891 007');
            expect(getInputModelValue()).toEqual(12340567891007);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 6,
                spaces: { before: 4, after: 4, newAdded: 0 }
            });

            setInputSelectionPosition(0);
            setInputViewValue('0', 'push');
            expect(getInputViewValue()).toEqual('12 340 567 891 007');
            expect(getInputModelValue()).toEqual(12340567891007);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 1,
                spaces: { before: 4, after: 4, newAdded: 0 }
            });

            setInputSelectionPosition(0);
            setInputViewValue('8', 'push');
            expect(getInputViewValue()).toEqual('812 340 567 891 007');
            expect(getInputModelValue()).toEqual(812340567891007);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 1,
                spaces: { before: 4, after: 4, newAdded: 0 }
            });

            setInputSelectionPosition(0);
            setInputViewValue(',', 'push');
            expect(getInputViewValue()).toEqual('0.812');
            expect(getInputModelValue()).toEqual(0.812);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 5,
                spaces: { before: 4, after: 0, newAdded: 4 }
            });

            setInputSelectionPosition(0);
            setInputViewValue('.', 'push');
            expect(getInputViewValue()).toEqual('0');
            expect(getInputModelValue()).toEqual(0);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 1,
                spaces: { before: 0, after: 0, newAdded: 0 }
            });

            setInputSelectionPosition(1);
            setInputViewValue(',', 'push');
            expect(getInputViewValue()).toEqual('0');
            expect(getInputModelValue()).toEqual(0);
            expect(getCurrentCaretSegments()).toEqual({
                cursorPosition: 1,
                spaces: { before: 0, after: 0, newAdded: 0 }
            });

            setInputViewValue('812340567891007');
            expect(getInputViewValue()).toEqual('812 340 567 891 007');
            expect(getInputModelValue()).toEqual(812340567891007);

            setInputSelectionPosition(8);
            setInputViewValue(',', 'push');
            expect(getInputViewValue()).toEqual('812 340.568');
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

        function getCurrentCaretSegments(): Immutable<AmountFormatSegments> | undefined {
            return getDirectiveInfo()?.getCurrentCaretSegments();
        }
    });
});
