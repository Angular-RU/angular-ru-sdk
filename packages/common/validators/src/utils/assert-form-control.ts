import { AbstractControl, FormControl } from '@angular/forms';

export function assertFormControl(control: AbstractControl, controlName: string): asserts control is FormControl {
    if (!(control instanceof FormControl)) {
        throw new Error(`${controlName} must be set on FormControl`);
    }
}
