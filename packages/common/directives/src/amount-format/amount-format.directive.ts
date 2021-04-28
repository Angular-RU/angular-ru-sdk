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
import { Any, Fn, Immutable } from '@angular-ru/common/typings';
import { detectChanges, isNil } from '@angular-ru/common/utils';

import { AmountFormatSegments } from './amount-format-segments';

@Directive({ selector: '[amountFormat]', exportAs: 'amountFormat' })
export class AmountFormatDirective implements OnInit, AfterViewInit, OnDestroy {
    @Input('max-digits') public maximumFractionDigits: number | null = null;
    @Input('min-digits') public minimumFractionDigits: number | null = null;
    private segments: AmountFormatSegments = { cursorPosition: 0, spaces: { before: 0, after: 0, newAdded: 0 } };
    private markedAsDirty: boolean = true;
    private inputUnlisten: Fn | null = null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private blurUnlisten: Fn | null = null;

    constructor(
        private readonly ngZone: NgZone,
        private readonly renderer: Renderer2,
        private readonly el: ElementRef<HTMLInputElement>,
        @Optional() private readonly cd?: ChangeDetectorRef,
        @Optional() private readonly ngControl?: NgControl
    ) {}

    public get dirty(): boolean {
        return this.markedAsDirty;
    }

    public get element(): HTMLInputElement {
        return this.el.nativeElement;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
        this.ngZone.runOutsideAngular((): void => {
            this.inputUnlisten = this.renderer.listen(this.element, 'input', (event: KeyboardEvent): void =>
                this.keypress(event)
            );

            this.blurUnlisten = this.renderer.listen(this.element, 'blur', (event: KeyboardEvent): void =>
                this.blur(event)
            );
        });
    }

    public unlisten(): void {
        this.inputUnlisten?.();
    }

    public getCurrentCaretSegments(): Immutable<AmountFormatSegments> {
        return this.segments as Immutable<AmountFormatSegments>;
    }

    public blur(event: KeyboardEvent): void {
        // eslint-disable-next-line no-console
        console.log('blur', event);
    }

    // eslint-disable-next-line max-lines-per-function,complexity
    public keypress(event: KeyboardEvent): void {
        // eslint-disable-next-line @typescript-eslint/typedef
        const ref = event.target as HTMLInputElement;

        this.segments.spaces.before = ref.value.match(/\s/g)?.length ?? 0;
        ref.value = ref.value.replace(/,/g, '.');

        // eslint-disable-next-line @typescript-eslint/typedef
        let value = ref.value.replace(/[^\d,.-]/g, '');

        // console.log('preval', value);
        // console.log(value, isNaN(value as any));

        if (value !== '-' && isNaN(value as Any)) {
            value = value.slice(0, -1);
        } else if (value.slice(-1) === '.') {
            //  this.ngControl?.reset(value + `0`);
            // eslint-disable-next-line @typescript-eslint/typedef
            const val = value + `0`;

            this.ngControl!.reset(Number(val));
            this.element.value = Number(value).toLocaleString('ru-RU') + '.';

            // console.log('fuck', this.ngControl?.value);
            return;
        }

        this.segments.cursorPosition = ref.selectionStart ?? 0;

        ref.value = value;

        this.format(value);

        this.segments.spaces.after = ref.value.match(/\s/g)?.length ?? 0;
        this.segments.spaces.newAdded = Math.abs(this.segments.spaces.after - this.segments.spaces.before);
        this.segments.cursorPosition = this.segments.cursorPosition + this.segments.spaces.newAdded;
        ref.setSelectionRange(this.segments.cursorPosition, this.segments.cursorPosition);

        this.segments.cursorPosition = ref.selectionEnd!;
    }

    public format(value?: string): void {
        //  console.log('pre format', value);
        const numberValue: number = parseFloat(value ?? this.element.value);
        //   console.log('numberValue', numberValue);

        // eslint-disable-next-line no-negated-condition
        if (!isNaN(numberValue)) {
            const formattedValue: string = numberValue.toLocaleString('ru-RU').replace(/,/g, '.');

            const modelValue: number = parseFloat(formattedValue.replace(/\s/g, '').replace(/,/g, '.'));

            this.ngControl?.reset(modelValue);
            this.element.value = formattedValue.replace(/\s/g, ' ');
        } else {
            this.ngControl?.reset(null);

            if (value === '-') {
                this.element.value = '-';
            }

            this.preventExpressionChangedAfter();
        }
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
