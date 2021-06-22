import { Directive, ElementRef, HostListener, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Any, Nullable } from '@angular-ru/common/typings';

@Directive({ selector: '[trimInput]' })
export class TrimInputDirective implements OnInit {
    private name: Nullable<string | number>;
    private previousName: Nullable<string | number>;
    private previousValue: Any;

    constructor(public readonly el: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

    @Input()
    public set formControlName(name: Nullable<string | number>) {
        this.previousValue = this.ngControl?.control?.parent?.get(this.name as Any)?.value;
        this.previousName = this.name;
        this.name = name;
    }

    public ngOnInit(): void {
        this.trimValue();
    }

    @HostListener('keydown.enter')
    public onEnter(): void {
        this.trimValue();
    }

    @HostListener('blur')
    public onBlur(): void {
        this.trimValue();
    }

    private trimValue(): void {
        this.el.nativeElement.value = this.el.nativeElement.value?.toString().trim();

        const control: Nullable<AbstractControl> = this.ngControl?.control?.parent
            ? this.ngControl?.control?.parent?.get(this.name as Any)
            : this.ngControl?.control?.get(this.name as Any);

        if (control) {
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
