import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { trim } from '@angular-ru/common/string';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

import { assertFormControl } from './utils/assert-form-control';

export function maxLengthIncludePreviousValueValidator(maxLength: number, previousValue: string = ''): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        assertFormControl(control, 'maxLengthIncludePreviousValueValidator');
        const controlValue: string | undefined | null = trim(control.value);

        if (checkValueIsEmpty(controlValue)) {
            return null;
        }
        const controlAndPreviousValues: string = `${previousValue} ${controlValue}`;
        const errorObject: ValidationErrors = {
            maxlength: {
                actualLength: controlAndPreviousValues.length,
                requiredLength: maxLength
            }
        };

        return controlAndPreviousValues.length > maxLength ? errorObject : null;
    };
}
