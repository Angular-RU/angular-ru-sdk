import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
    getCountSpacesOnString,
    getLastSymbol,
    removeLastSymbol,
    removeNonNumericSymbols,
    replaceEveryCommaOnDot
} from '@angular-ru/common/string';
import { Any, Fn, Immutable } from '@angular-ru/common/typings';
import { detectChanges } from '@angular-ru/common/utils';

import { AmountFormatSegments } from './amount-format-segments';
import { AmountOptions } from './amount-options';

@Directive({ selector: '[amountFormat]' })
export class AmountFormatDirective implements OnInit, AfterViewInit, OnDestroy {
    private segments: AmountFormatSegments = { cursorPosition: 0, spaces: { before: 0, after: 0, newAdded: 0 } };
    private options: Partial<Immutable<AmountOptions>> = { lang: 'ru-RU', formatOptions: {} };
    private inputUnlisten: Fn | null | undefined = null;
    private blurUnlisten: Fn | null | undefined = null;
    private markedAsDirty: boolean = true;

    constructor(
        private readonly el: ElementRef<HTMLInputElement>,
        @Optional() private readonly ngControl?: NgControl,
        @Optional() private readonly ngZone?: NgZone,
        @Optional() private readonly renderer?: Renderer2,
        @Optional() private readonly cd?: ChangeDetectorRef
    ) {}

    public get amountFormat(): Partial<Immutable<AmountOptions>> {
        return this.options;
    }

    @Input()
    public set amountFormat(options: Partial<Immutable<AmountOptions>>) {
        this.options = { ...this.options, ...(options || {}) };
    }

    public get dirty(): boolean {
        return this.markedAsDirty;
    }

    public get element(): HTMLInputElement {
        return this.el.nativeElement;
    }

    private static isLastSymbolIsDot(val: string): boolean {
        return getLastSymbol(val) === '.';
    }

    private static isInvalidNumberFormat(val: string): boolean {
        return val !== '-' && isNaN(val as Any);
    }

    public ngOnInit(): void {
        this.listen();
    }

    public ngAfterViewInit(): void {
        this.setup();
        this.format();
    }

    public ngOnDestroy(): void {
        this.unlisten();
    }

    public listen(): void {
        this.ngZone?.runOutsideAngular((): void => {
            this.inputUnlisten = this.renderer?.listen(this.element, 'input', (): void => this.format());
            this.blurUnlisten = this.renderer?.listen(this.element, 'blur', (): void => this.blurFormat());
        });
    }

    public unlisten(): void {
        this.inputUnlisten?.();
        this.blurUnlisten?.();
    }

    public getCurrentCaretSegments(): Immutable<AmountFormatSegments> {
        return this.segments as Immutable<AmountFormatSegments>;
    }

    public blurFormat(): void {
        if (AmountFormatDirective.isLastSymbolIsDot(this.element.value)) {
            this.element.value = removeLastSymbol(this.element.value) ?? '';
        }
    }

    public format(): void {
        this.element.value = replaceEveryCommaOnDot(this.element.value);

        this.checkSpacesBeforeFormatting(this.element);
        const value: string = removeNonNumericSymbols(this.element.value);

        if (AmountFormatDirective.isInvalidNumberFormat(value)) {
            this.element.value = removeLastSymbol(value) ?? '';
        } else if (AmountFormatDirective.isLastSymbolIsDot(value)) {
            this.preparedModelWhenIncompleteDotValue(value);
            return;
        }

        this.setDefaultCursorPosition(this.element);
        this.patchViewModel(value);
        this.checkSpacesAfterFormatting(this.element);
    }

    private patchViewModel(value: string): void {
        const numberValue: number = parseFloat(value);

        if (isNaN(numberValue)) {
            this.ngControl?.reset(null);
            this.element.value = value === '-' ? value : removeNonNumericSymbols(this.element.value);
            this.preventExpressionChangedAfter();
        } else {
            const formattedValue: string = this.toLocaleString(numberValue);
            const modelValue: number = parseFloat(formattedValue.replace(/\s/g, ''));

            this.ngControl?.reset(modelValue);
            this.element.value = formattedValue;
        }
    }

    private checkSpacesBeforeFormatting(ref: HTMLInputElement): void {
        this.segments.spaces.before = getCountSpacesOnString(ref.value);
    }

    private setDefaultCursorPosition(ref: HTMLInputElement): void {
        this.segments.cursorPosition = ref.selectionStart ?? 0;
    }

    private toLocaleString(value: number): string {
        return value
            .toLocaleString(this.options.lang, this.options.formatOptions)
            .replace(/,/g, '.')
            .replace(/\s/g, ' ');
    }

    /**
     * when the user entered a value incompletely
     * @param value - `15.` or `0.`, ...
     */
    private preparedModelWhenIncompleteDotValue(value: string): void {
        this.ngControl?.reset(Number(`${value}0`));
        this.element.value = `${this.toLocaleString(Number(value))}.`;
    }

    private checkSpacesAfterFormatting(ref: HTMLInputElement): void {
        this.segments.spaces.after = getCountSpacesOnString(ref.value);
        this.segments.spaces.newAdded = Math.abs(this.segments.spaces.after - this.segments.spaces.before);
        this.segments.cursorPosition = this.segments.cursorPosition + this.segments.spaces.newAdded;
        ref.setSelectionRange(this.segments.cursorPosition, this.segments.cursorPosition);
        this.segments.cursorPosition = ref.selectionEnd!;
    }

    private preventExpressionChangedAfter(): void {
        if (this.markedAsDirty) {
            detectChanges(this.cd);
            this.markedAsDirty = false;
        }
    }

    private setup(): void {
        this.el.nativeElement.setAttribute('type', 'text');
    }
}
