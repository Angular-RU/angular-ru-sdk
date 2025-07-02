import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {gaussRound, getFractionSeparator, toNumber} from '@angular-ru/cdk/number';
import {deepClone} from '@angular-ru/cdk/object';
import {
    getLastSymbol,
    removeLastSymbol,
    removeNonNumericSymbols,
} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {checkValueIsFilled, detectChanges} from '@angular-ru/cdk/utils';
import {fromEvent, Subscription} from 'rxjs';

import {AMOUNT_FORMAT_OPTIONS, DEFAULT_AMOUNT_OPTIONS} from './amount-format.properties';
import {AmountOptions} from './amount-options';

@Directive({standalone: false, selector: '[amountFormat]'})
export class AmountFormatDirective implements OnInit, AfterViewInit, OnDestroy {
    private readonly subscriptions: Subscription = new Subscription();
    private previousLang: Nullable<string> = null;
    private readonly maximumFractionDigits: number = 3;
    private isInsideAngularZone = true;
    private options: Partial<AmountOptions> = {};
    private markedAsDirty = true;
    private cursorPointer = 0;

    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLInputElement>,
        @Inject(AMOUNT_FORMAT_OPTIONS) globalOptions: AmountOptions,
        @Inject(NgControl) @Optional() private readonly ngControl?: NgControl,
        @Inject(NgZone) @Optional() private readonly ngZone?: NgZone,
        @Inject(ChangeDetectorRef) @Optional() private readonly cd?: ChangeDetectorRef,
    ) {
        this.setFirstLocalOptionsByGlobal(globalOptions);
    }

    public get isInAngularZone(): boolean {
        return this.isInsideAngularZone;
    }

    public get dirty(): boolean {
        return this.markedAsDirty;
    }

    public get element(): HTMLInputElement {
        return this.elementRef.nativeElement;
    }

    public get amountFormatOptions(): Partial<AmountOptions> {
        return this.options;
    }

    @Input()
    public set amountFormatOptions(options: Partial<AmountOptions>) {
        this.options = {...this.options, ...(options ?? {})};
        this.recalculateWhenChangesOptions();
    }

    public setLang(lang: string): void {
        this.options.lang = lang;
        this.recalculateWhenChangesOptions();
    }

    public getCursorPosition(): number {
        return this.cursorPointer;
    }

    public ngOnInit(): void {
        this.setupElementType();
        this.subscribeToElementEvents();
    }

    public ngAfterViewInit(): void {
        this.format();
    }

    public ngOnDestroy(): void {
        this.unsubscribeFromElementEvents();
    }

    public subscribeToElementEvents(): void {
        this.ngZone?.runOutsideAngular((): void => {
            this.subscriptions.add(
                fromEvent(this.element, 'input').subscribe((): void => {
                    this.isInsideAngularZone = NgZone.isInAngularZone();
                    this.format();
                }),
            );

            this.subscriptions.add(
                fromEvent(this.element, 'blur').subscribe((): void => {
                    this.isInsideAngularZone = NgZone.isInAngularZone();
                    this.formatOnBlur();
                }),
            );
        });
    }

    public unsubscribeFromElementEvents(): void {
        this.subscriptions.unsubscribe();
    }

    public formatOnBlur(): void {
        if (this.isIncorrectPreviewAfterBlur()) {
            this.element.value = removeLastSymbol(this.element.value) ?? '';
        }
    }

    public format(): void {
        const fraction: string = this.getFractionSeparator();

        this.cursorPointer = this.element.selectionStart ?? 0;
        const isInSafeSelectionPosition: boolean =
            this.cursorPointer !== this.element.value.length;

        this.replaceAllInvalidSymbolsBeforeTranslation();

        if (this.viewModelIsOnlyMinus()) {
            this.resetModelValue();
            // Note: should be set custom view model value
            // because when we trigger ngControl?.reset
            // it's also reset view model
            this.element.value = '-';

            return;
        }

        const originValueBeforeReset: string = this.element.value;
        const numberValue: number = this.getNumberValueWithGaussRounded();

        this.setModelValueBy(numberValue);
        this.element.value = originValueBeforeReset;

        const stringValue: string = this.prepareConvertedToLocaleValue(
            numberValue,
            fraction,
        );

        // Note: we should reset view model value
        // when user set invalid number value as `15,,,,,0` or `15.00.00.00.00`
        this.element.value = isNaN(this.ngControl?.value) ? '' : stringValue;

        this.setSelectionRangeBy(isInSafeSelectionPosition, stringValue);
        this.preventExpressionChangedAfter();
    }

    private isIncorrectPreviewAfterBlur(): boolean {
        return this.lastSymbolIsFraction() || this.viewModelIsOnlyMinus();
    }

    /**
     * note: after reset model value then control override view model
     */
    private resetModelValue<T>(value: Nullable<T> = null): void {
        this.ngControl?.reset(value);
    }

    private replaceAllInvalidSymbolsBeforeTranslation(): void {
        const fraction: string = this.getFractionSeparator();

        this.element.value = this.removeNonNumericSymbols();
        this.element.value = this.replaceInvalidFractionPosition(fraction);
        this.element.value = this.removeDuplicateMinusOrFractionSymbol(fraction);
    }

    private getMaximumFractionDigits(): number {
        return (
            this.options.formatOptions?.maximumFractionDigits ??
            this.maximumFractionDigits
        );
    }

    private getLastSymbolsAsZeroDot(fraction: string): Nullable<string> {
        const maximumFractionDigits: number = this.getMaximumFractionDigits();

        let lastSymbolsAsZeroDot: string =
            maximumFractionDigits === 0
                ? ''
                : (new RegExp(`(\\${fraction})(.+)?`)
                      .exec(this.element.value)?.[0]
                      ?.replace(/,|./, '') ?? '');

        const isOverflowGaussRound: boolean =
            lastSymbolsAsZeroDot.length > this.maximumFractionDigits;

        if (isOverflowGaussRound) {
            const parsedDot: number = gaussRound(
                toNumber(`0${fraction}${lastSymbolsAsZeroDot}`, this.options.lang),
                maximumFractionDigits,
            );

            lastSymbolsAsZeroDot = isNaN(parsedDot)
                ? ''
                : parsedDot.toString().replace(/0\./, '');
        }

        return lastSymbolsAsZeroDot;
    }

    private prepareConvertedToLocaleValue(
        numberValueWithGaussRounded: number,
        fraction: string,
    ): string {
        const lastSymbolAsFraction: boolean = this.lastSymbolIsFraction();
        let convertedToLocaleValue: string = this.getConvertedToLocaleString(
            numberValueWithGaussRounded,
        );

        if (lastSymbolAsFraction) {
            convertedToLocaleValue = `${convertedToLocaleValue}${fraction}`;
        } else {
            const lastSymbolsAsZeroDot: Nullable<string> =
                this.getLastSymbolsAsZeroDot(fraction);

            if (checkValueIsFilled(lastSymbolsAsZeroDot)) {
                const splitValues: string[] = convertedToLocaleValue.split(fraction);
                const beforePoint: Nullable<string> = splitValues?.[0];

                if (checkValueIsFilled(beforePoint)) {
                    convertedToLocaleValue = `${beforePoint}${fraction}${lastSymbolsAsZeroDot}`;
                } else {
                    convertedToLocaleValue = `0${fraction}${lastSymbolsAsZeroDot}`;
                }
            }
        }

        return convertedToLocaleValue.replaceAll(/\s/g, ' ');
    }

    private setModelValueBy(numberValue: number): void {
        if (isNaN(numberValue)) {
            this.resetModelValue();
        } else {
            this.resetModelValue(numberValue);
        }
    }

    private getConvertedToLocaleString(numberValue: number): string {
        return (isNaN(numberValue) ? '' : numberValue).toLocaleString(
            this.options.lang,
            this.options.formatOptions,
        );
    }

    private getNumberValueWithGaussRounded(): number {
        const maximumFractionDigits: number = this.getMaximumFractionDigits();

        return gaussRound(
            toNumber(this.element.value, this.options.lang),
            maximumFractionDigits,
        );
    }

    private lastSymbolIsFraction(): boolean {
        return getLastSymbol(this.element.value) === this.getFractionSeparator();
    }

    private replaceInvalidFractionPosition(fraction: string): string {
        return this.element.value.replaceAll(
            new RegExp(`\\${fraction}+$`, 'g'),
            fraction,
        );
    }

    private removeDuplicateMinusOrFractionSymbol(fraction: string): string {
        let value: string = this.element.value;
        let count = 0;

        value = value.replaceAll(new RegExp(`\\${fraction}`, 'g'), (): string => {
            count++;

            return count > 1 ? '' : fraction;
        });

        if (!value.startsWith('-')) {
            value = value.replaceAll('-', '');
        }

        return value;
    }

    private viewModelIsOnlyMinus(): boolean {
        return this.element.value === '-';
    }

    private getFractionSeparator(): string {
        return getFractionSeparator(this.options.lang ?? DEFAULT_AMOUNT_OPTIONS.lang);
    }

    private removeNonNumericSymbols(): string {
        return this.viewModelIsOnlyMinus()
            ? this.element.value
            : removeNonNumericSymbols(this.element.value);
    }

    private setSelectionRangeBy(safePosition: boolean, value: string): void {
        try {
            if (safePosition) {
                this.element.setSelectionRange(this.cursorPointer, this.cursorPointer);
            } else {
                this.cursorPointer = value.length;
                this.element.setSelectionRange(this.cursorPointer, this.cursorPointer);
            }
        } catch {
            // Caretaker note:
            // this situation can happen if <input type=number />
            // at some point, the directive may not have time to work and set the value `type=text`
        }
    }

    private setFirstLocalOptionsByGlobal(options: AmountOptions): void {
        this.options = deepClone(options);
        this.previousLang = this.options.lang;
    }

    private recalculateWhenChangesOptions(): void {
        const value: number = toNumber(
            this.element.value,
            this.previousLang ?? this.options.lang,
        );

        this.element.value = value.toLocaleString(
            this.options.lang,
            this.options.formatOptions ?? {},
        );
        this.previousLang = this.options.lang;
        this.format();
    }

    private preventExpressionChangedAfter(): void {
        if (this.markedAsDirty) {
            detectChanges(this.cd);
            this.markedAsDirty = false;
        }
    }

    private setupElementType(): void {
        this.elementRef.nativeElement.setAttribute('type', 'text');
    }
}
