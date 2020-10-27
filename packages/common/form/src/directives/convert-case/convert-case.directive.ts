import { toStringVal } from '@angular-ru/common/string';
import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({ selector: '[convertCase]' })
export class ConvertCaseDirective implements AfterViewInit {
    @Input() public toUpperCase: boolean = true;
    @Input() public toLowerCase: boolean = false;

    constructor(private readonly el: ElementRef) {}

    private get element(): MatInput {
        return this.el.nativeElement;
    }

    public ngAfterViewInit(): void {
        if (this.element.value) {
            this.onInput();
        }
    }

    @HostListener('input')
    public onInput(): void {
        const dirtyValue: string = toStringVal(this.el.nativeElement.value);
        this.element.value = this.toLowerCase ? dirtyValue.toLowerCase() : dirtyValue.toUpperCase();
    }
}
