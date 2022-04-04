import { Directive, ElementRef, HostListener, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Any, Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

@Directive({ selector: '[trimInput]' })
export class TrimInputDirective implements OnInit {
    private declare name: string;
    private declare previousName: string;
    private previousValue: Any;

    @Input() public trimDisabled: boolean = false;

    constructor(public readonly elementRef: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

    @Input()
    public set formControlName(name: string) {
        this.previousValue = this.ngControl?.control?.parent?.get(this.name)?.value;
        this.previousName = this.name;
        this.name = name;
    }

    @HostListener('keydown.enter')
    public onEnter(): void {
        this.trimValue();
    }

    @HostListener('blur')
    public onBlur(): void {
        this.trimValue();
    }

    public ngOnInit(): void {
        this.trimValue();
    }

    private trimValue(): void {
        if (this.trimDisabled) {
            return;
        }

        this.elementRef.nativeElement.value = this.elementRef.nativeElement.value?.toString().trim();

        const control: Nullable<AbstractControl> = this.ngControl?.control?.parent
            ? this.ngControl?.control?.parent?.get(this.name)
            : this.ngControl?.control?.get(this.name);

        if (isNotNil(control)) {
            const modelValue: string = (this.ngControl?.value ?? control?.value)?.toString().trim();

            if (this.ngControl?.control === control) {
                this.ngControl?.control?.setValue(modelValue, { emitEvent: false });
            } else {
                control?.setValue(modelValue, { emitEvent: false });
                control?.parent?.get(this.previousName)?.setValue(this.previousValue, { emitEvent: false });
            }
        }
    }
}
