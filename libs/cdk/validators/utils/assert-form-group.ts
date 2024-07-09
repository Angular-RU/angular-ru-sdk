import {AbstractControl, FormGroup} from '@angular/forms';

export function assertFormGroup(
    control: AbstractControl,
    controlName: string,
): asserts control is FormGroup {
    if (!(control instanceof FormGroup)) {
        throw new Error(`${controlName} must be used on form group`);
    }
}
