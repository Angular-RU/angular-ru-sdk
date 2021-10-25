import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { checkIsShallowEmpty } from '@angular-ru/cdk/object';
import { Any } from '@angular-ru/cdk/typings';

export function everyArrayItemValidator(validators: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (Array.isArray(control.value)) {
            const errors: ValidationErrors = control.value
                .map((value: Any): ValidationErrors | null => getErrorsForSingleValue(value, validators))
                .reduce(concatErrors, {}) as ValidationErrors;

            return checkIsShallowEmpty(errors) ? null : errors;
        }

        return null;
    };
}

function getErrorsForSingleValue(value: Any, validators: ValidatorFn[]): ValidationErrors | null {
    const control: AbstractControl = new FormControl(value, { validators });

    return control.errors;
}

function concatErrors(acc: ValidationErrors, el: ValidationErrors | null): ValidationErrors {
    return { ...acc, ...el };
}
