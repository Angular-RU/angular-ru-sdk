import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { exclude, hasItems, takeFirstItem } from '@angular-ru/cdk/array';
import { Any } from '@angular-ru/cdk/typings';

export function everyArrayItemValidator(validators: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (Array.isArray(control.value)) {
            const errors: ValidationErrors[] = control.value
                .map((value: Any): (ValidationErrors | null)[] => applyValidatorsForSingleValue(value, validators))
                .reduce(
                    (acc: ValidationErrors[], el: (ValidationErrors | null)[]): ValidationErrors[] =>
                        acc.concat(...(el.filter(exclude(null)) as ValidationErrors[])),
                    []
                );

            return hasItems(errors) ? takeFirstItem(errors) : null;
        }

        return null;
    };
}

function applyValidatorsForSingleValue(value: Any, validators: ValidatorFn[]): (ValidationErrors | null)[] {
    const control: AbstractControl = new FormControl(value);

    return validators.map((validator: ValidatorFn): ValidationErrors | null => validator(control));
}
