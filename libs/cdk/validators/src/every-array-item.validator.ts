import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { checkIsShallowEmpty } from '@angular-ru/cdk/object';

export function everyArrayItemValidator(validators: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (Array.isArray(control.value)) {
            const errors: ValidationErrors = control.value
                .map((value: any): ValidationErrors | null => getErrorsForSingleValue(value, validators))
                .reduce(
                    (accumulator: ValidationErrors, element: ValidationErrors | null): ValidationErrors =>
                        concatErrors(accumulator, element),
                    {}
                );

            return checkIsShallowEmpty(errors) ? null : errors;
        }

        return null;
    };
}

function getErrorsForSingleValue(value: any, validators: ValidatorFn[]): ValidationErrors | null {
    const control: AbstractControl = new FormControl(value, { validators });

    return control.errors;
}

function concatErrors(accumulator: ValidationErrors, element: ValidationErrors | null): ValidationErrors {
    return { ...accumulator, ...element };
}
