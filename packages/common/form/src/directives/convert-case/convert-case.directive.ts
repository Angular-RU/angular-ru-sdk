import { AfterViewInit, Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { toStringVal } from '@angular-ru/common/string';

@Directive({ selector: '[convertCase]' })
export class ConvertCaseDirective implements AfterViewInit {
    @Input() public toUpperCase: boolean = true;
    @Input() public toLowerCase: boolean = false;

    constructor(private readonly el: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

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
        const dirtyValue: string = toStringVal(this.element.value);
        this.element.value = this.toLowerCase ? dirtyValue.toLowerCase() : dirtyValue.toUpperCase();
        this.ngControl?.reset(this.element.value);
    }
}
