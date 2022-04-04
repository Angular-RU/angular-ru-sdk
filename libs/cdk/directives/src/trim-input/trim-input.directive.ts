import { Directive, ElementRef, HostListener, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Any, Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

@Directive({ selector: '[trimInput]' })
export class TrimInputDirective implements OnInit {
    private name: Nullable<string | number>;
    private previousName: Nullable<string | number>;
    private previousValue: Any;

    @Input() public trimDisabled: boolean = false;

    constructor(public readonly elementRef: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

    @Input()
    public set formControlName(name: Nullable<string | number>) {
        this.previousValue = this.ngControl?.control?.parent?.get(this.name as Any)?.value;
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
            ? this.ngControl?.control?.parent?.get(this.name as Any)
            : this.ngControl?.control?.get(this.name as Any);

        if (isNotNil(control)) {
            const modelValue: string = (this.ngControl?.value ?? control?.value)?.toString().trim();

            if (this.ngControl?.control === control) {
                this.ngControl?.control?.setValue(modelValue, { emitEvent: false });
            } else {
                control?.setValue(modelValue, { emitEvent: false });
                control?.parent?.get(this.previousName as Any)?.setValue(this.previousValue, { emitEvent: false });
            }
        }
    }
}
