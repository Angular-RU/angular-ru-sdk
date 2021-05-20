import { Directive, ElementRef, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Any } from '@angular-ru/common/typings';
import { filterCharacters } from '@angular-ru/common/utils';

@Directive({ selector: '[filterCharacters]' })
export class FilterCharactersDirective implements OnInit {
    @Input('filterCharacters')
    public characters: string[] = [];

    private name: string | number | null | undefined;
    private previousName: string | number | null | undefined;
    private previousValue: Any;

    constructor(public readonly el: ElementRef, @Optional() private readonly ngControl?: NgControl) {}

    @Input()
    public set formControlName(name: string | undefined) {
        this.previousValue = this.ngControl?.control?.parent?.get(this.name as Any)?.value;
        this.previousName = this.name;
        this.name = name;
    }

    public ngOnInit(): void {
        this.filterCharacters();
        this.ngControl?.control?.valueChanges.subscribe((): void => {
            this.filterCharacters();
        });
    }

    private filterCharacters(): void {
        if (typeof this.el.nativeElement.value !== 'string') {
            return;
        }

        this.el.nativeElement.value = filterCharacters(this.el.nativeElement.value, this.characters);
        const control: AbstractControl | null | undefined = this.getControl();

        if (control) {
            this.updateControlValue(control);
        }
    }

    private getControl(): AbstractControl | null | undefined {
        return this.ngControl?.control?.parent
            ? this.ngControl?.control?.parent?.get(this.name as Any)
            : this.ngControl?.control?.get(this.name as Any);
    }

    private updateControlValue(control: AbstractControl): void {
        const value: Any = this.ngControl?.value ?? control?.value;
        if (typeof value !== 'string') {
            return;
        }
        const modelValue: string = filterCharacters(value, this.characters);

        if (this.ngControl?.control === control) {
            this.ngControl?.control?.setValue(modelValue, { emitEvent: false });
        } else {
            control?.setValue(modelValue, { emitEvent: false });
            control?.parent?.get(this.previousName as Any)?.setValue(this.previousValue, { emitEvent: false });
        }
    }
}
