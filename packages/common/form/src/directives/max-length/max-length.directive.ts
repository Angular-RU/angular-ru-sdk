import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({ selector: 'maxLength]' })
export class MaxLengthDirective implements AfterViewInit, OnInit {
    @Input() public ngMaxLength?: number | string;
    @Input() public lang: string = 'ru';
    public isNumber: boolean = false;

    constructor(private readonly el: ElementRef) {}

    private get value(): string {
        return String(this.element.value || '');
    }

    private get element(): HTMLInputElement {
        return this.el.nativeElement;
    }

    public ngOnInit(): void {
        this.isNumber = this.element.type === 'number';
    }

    public ngAfterViewInit(): void {
        this.validateMaxLength();
    }

    @HostListener('keyup')
    public validateMaxLength(): void {
        const origin: string = this.isNumber
            ? this.value?.toString()?.replace(/\s+|-/g, '')
            : this.value?.toString()?.trim();
        const ngMaxLength: number = parseInt(this.ngMaxLength as string);

        const limitOffset: boolean = origin.length > ngMaxLength;

        if (limitOffset && this.isNumber) {
            this.element.value = parseFloat(origin.substring(0, ngMaxLength)).toLocaleString(this.lang);
        } else if (limitOffset) {
            this.element.value = origin.substring(0, ngMaxLength);
        }
    }
}
