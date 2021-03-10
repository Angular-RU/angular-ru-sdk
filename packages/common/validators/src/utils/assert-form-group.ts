import { AbstractControl, FormGroup } from '@angular/forms';

export function assertFormGroup(control: AbstractControl, entityName: string): asserts control is FormGroup {
    if (!(control instanceof FormGroup)) {
        throw new Error(`${entityName} must be used on form group`);
    }
}
