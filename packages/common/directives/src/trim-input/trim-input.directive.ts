import { Directive, ElementRef, HostListener, InjectFlags, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Any } from '@angular-ru/common/typings';

@Directive({ selector: '[trimInput]' })
export class TrimInputDirective implements OnInit {
    private name: string | number | null | undefined;
    private previousName: string | number | null | undefined;
    private previousValue: Any;

    constructor(public readonly el: ElementRef, private readonly injector: Injector) {}

    @Input()
    public set formControlName(name: string | number | null | undefined) {
        this.previousValue = this.ngControl?.control?.parent?.get(this.name as Any)?.value;
        this.previousName = this.name;
        this.name = name;
    }

    public get ngControl(): NgControl | undefined {
        return this.injector.get(NgControl, undefined, InjectFlags.Self);
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

        const control: AbstractControl | null | undefined = this.ngControl?.control?.parent
            ? this.ngControl?.control?.parent?.get(this.name as Any)
            : this.ngControl?.control?.get(this.name as Any);

        if (control) {
            const modelValue: string = (this.ngControl?.value ?? control?.value)?.toString().trim();

            if (this.ngControl?.control === control) {
                this.ngControl?.control?.reset(modelValue);
            } else {
                control?.setValue(modelValue, { emitEvent: false });
                control?.parent?.get(this.previousName as Any)?.reset(this.previousValue);
            }
        }
    }
}
