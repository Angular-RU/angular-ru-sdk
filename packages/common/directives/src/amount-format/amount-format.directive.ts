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
    Optional
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { gaussRound, getFractionSeparator, toNumber } from '@angular-ru/common/number';
import { deepClone } from '@angular-ru/common/object';
import { getLastSymbol, removeLastSymbol, removeNonNumericSymbols } from '@angular-ru/common/string';
import { detectChanges } from '@angular-ru/common/utils';
import { fromEvent, Subscription } from 'rxjs';

import { AMOUNT_FORMAT_OPTIONS, DEFAULT_AMOUNT_OPTIONS } from './amount-format.properties';
import { AmountOptions } from './amount-options';

@Directive({ selector: '[amountFormat]' })
export class AmountFormatDirective implements OnInit, AfterViewInit, OnDestroy {
    private readonly subscriptions: Subscription = new Subscription();
    private previousLang: string | null | undefined = null;
    private readonly maximumFractionDigits: number = 3;
    private isInsideAngularZone: boolean = true;
    private options: Partial<AmountOptions> = {};
    private markedAsDirty: boolean = true;
    private cursorPointer: number = 0;

    constructor(
        private readonly el: ElementRef<HTMLInputElement>,
        @Inject(AMOUNT_FORMAT_OPTIONS) globalOptions: AmountOptions,
        @Optional() private readonly ngControl?: NgControl,
        @Optional() private readonly ngZone?: NgZone,
        @Optional() private readonly cd?: ChangeDetectorRef
    ) {
        this.setFirstLocalOptionsByGlobal(globalOptions);
    }

    public get isInAngularZone(): boolean {
        return this.isInsideAngularZone;
    }

    public get amountFormatOptions(): Partial<AmountOptions> {
        return this.options;
    }

    @Input()
    public set amountFormatOptions(options: Partial<AmountOptions>) {
        this.options = { ...this.options, ...(options ?? {}) };
        this.recalculateWhenChangesOptions();
    }

    public get dirty(): boolean {
        return this.markedAsDirty;
    }

    public get element(): HTMLInputElement {
        return this.el.nativeElement;
    }

    public setLang(lang: string): void {
        this.options.lang = lang;
        this.recalculateWhenChangesOptions();
    }

    public getCursorPosition(): number {
        return this.cursorPointer;
    }

    public ngOnInit(): void {
        this.setup();
        this.listen();
    }

    public ngAfterViewInit(): void {
        this.format();
    }

    public ngOnDestroy(): void {
        this.unlisten();
    }

    public listen(): void {
        this.ngZone?.runOutsideAngular((): void => {
            this.subscriptions.add(
                fromEvent(this.element, 'input').subscribe((): void => {
                    this.isInsideAngularZone = NgZone.isInAngularZone();
                    this.format();
                })
            );

            this.subscriptions.add(
                fromEvent(this.element, 'blur').subscribe((): void => {
                    this.isInsideAngularZone = NgZone.isInAngularZone();
                    this.blurFormat();
                })
            );
        });
    }

    public unlisten(): void {
        this.subscriptions.unsubscribe();
    }

    public blurFormat(): void {
        if (this.getLastSymbolAsFraction()) {
            this.element.value = removeLastSymbol(this.element.value) ?? '';
        }
    }

    public format(): void {
        const fraction: string = this.getFractionSeparator();
        this.setCursorPointer(this.element.selectionStart);
        const shouldBeSafeSelectionPosition: boolean = this.shouldBeSafeSelectionPosition();
        this.replaceAllInvalidSymbolsBeforeTranslation();

        if (this.viewModelIsMinus()) {
            this.resetModelValueWhenViewIsMinus();
            return;
        }

        const numberValue: number = this.getNumberValueWithGaussRounded();
        this.setModelValueByGaussRounded(numberValue);

        const stringValue: string = this.prepareConvertedToLocaleValue(numberValue, fraction);

        this.element.value = isNaN(this.ngControl?.value) ? '' : stringValue;
        this.setSelectionRangeBy(shouldBeSafeSelectionPosition, stringValue);
        this.preventExpressionChangedAfter();
    }

    private replaceAllInvalidSymbolsBeforeTranslation(): void {
        const fraction: string = this.getFractionSeparator();
        this.element.value = this.removeNonNumericSymbols();
        this.element.value = this.replaceInvalidFractionPosition(fraction);
        this.element.value = this.removeDuplicateMinusOrFractionSymbol(fraction);
    }

    private getMaximumFractionDigits(): number {
        return this.options.formatOptions?.maximumFractionDigits ?? this.maximumFractionDigits;
    }

    private getLastSymbolsAsZeroDot(fraction: string): string | undefined {
        const maximumFractionDigits: number = this.getMaximumFractionDigits();

        let lastSymbolsAsZeroDot: string | undefined =
            maximumFractionDigits === 0
                ? ''
                : this.element.value.match(new RegExp(`(\\${fraction})(.+)?`))?.[0]?.replace(/,|./, '');

        const isOverflowGaussRound: boolean =
            !!lastSymbolsAsZeroDot && lastSymbolsAsZeroDot.length > this.maximumFractionDigits;

        if (isOverflowGaussRound) {
            const parsedDot: number = gaussRound(
                toNumber(`0${fraction}${lastSymbolsAsZeroDot}`, this.options.lang),
                maximumFractionDigits
            );
            lastSymbolsAsZeroDot = isNaN(parsedDot) ? '' : parsedDot.toString().replace(/0\./, '');
        }

        return lastSymbolsAsZeroDot;
    }

    private prepareConvertedToLocaleValue(numberValueWithGaussRounded: number, fraction: string): string {
        const lastSymbolAsFraction: boolean = this.getLastSymbolAsFraction();
        let convertedToLocaleValue: string = this.getConvertedToLocaleString(numberValueWithGaussRounded);

        if (lastSymbolAsFraction) {
            convertedToLocaleValue = `${convertedToLocaleValue}${fraction}`;
        } else {
            const lastSymbolsAsZeroDot: string | undefined = this.getLastSymbolsAsZeroDot(fraction);
            if (lastSymbolsAsZeroDot) {
                const splitValues: string[] = convertedToLocaleValue.split(fraction);
                const beforePoint: string | undefined = splitValues?.[0];

                if (beforePoint) {
                    convertedToLocaleValue = `${beforePoint}${fraction}${lastSymbolsAsZeroDot}`;
                } else {
                    convertedToLocaleValue = `0${fraction}${lastSymbolsAsZeroDot}`;
                }
            }
        }

        return convertedToLocaleValue.replace(/\s/g, ' ');
    }

    private setModelValueByGaussRounded(numberValueWithGaussRounded: number): void {
        this.ngControl?.reset(isNaN(numberValueWithGaussRounded) ? '' : numberValueWithGaussRounded);
    }

    private getConvertedToLocaleString(numberValueWithGaussRounded: number): string {
        return (isNaN(numberValueWithGaussRounded) ? '' : numberValueWithGaussRounded).toLocaleString(
            this.options.lang,
            this.options.formatOptions
        );
    }

    private getNumberValueWithGaussRounded(): number {
        const maximumFractionDigits: number = this.getMaximumFractionDigits();
        return gaussRound(toNumber(this.element.value, this.options.lang), maximumFractionDigits);
    }

    private getLastSymbolAsFraction(): boolean {
        return getLastSymbol(this.element.value) === this.getFractionSeparator();
    }

    private replaceInvalidFractionPosition(fraction: string): string {
        return this.element.value.replace(new RegExp(`\\${fraction}+$`, 'g'), fraction);
    }

    private removeDuplicateMinusOrFractionSymbol(fraction: string): string {
        let value: string = this.element.value;
        let count: number = 0;

        value = value.replace(new RegExp(`\\${fraction}`, 'g'), (): string => {
            count++;
            return count > 1 ? '' : fraction;
        });

        if (value.indexOf('-') !== 0) {
            value = value.replace(/-/g, '');
        }

        return value;
    }

    private viewModelIsMinus(): boolean {
        return this.element.value === '-';
    }

    private resetModelValueWhenViewIsMinus(): void {
        this.ngControl?.reset('');
        this.element.value = '-';
    }

    private getFractionSeparator(): string {
        return getFractionSeparator(this.options.lang ?? DEFAULT_AMOUNT_OPTIONS.lang);
    }

    private removeNonNumericSymbols(): string {
        return this.element.value === '-' ? this.element.value : removeNonNumericSymbols(this.element.value);
    }

    private setCursorPointer(position: number | null): void {
        this.cursorPointer = position ?? 0;
    }

    private shouldBeSafeSelectionPosition(): boolean {
        return this.cursorPointer !== this.element.value.length;
    }

    private setSelectionRangeBy(safePosition: boolean, value: string): void {
        try {
            if (safePosition) {
                this.element.setSelectionRange(this.cursorPointer, this.cursorPointer);
            } else {
                this.cursorPointer = value.length;
                this.element.setSelectionRange(this.cursorPointer, this.cursorPointer);
            }
        } catch {}
    }

    private setFirstLocalOptionsByGlobal(options: AmountOptions): void {
        this.options = deepClone(options);
        this.previousLang = this.options.lang;
    }

    private recalculateWhenChangesOptions(): void {
        const value: number = toNumber(this.element.value, this.previousLang ?? this.options.lang);
        this.element.value = value.toLocaleString(this.options.lang, this.options.formatOptions);
        this.previousLang = this.options.lang;
        this.format();
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
