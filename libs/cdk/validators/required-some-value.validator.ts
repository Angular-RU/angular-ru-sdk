import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isNil} from '@angular-ru/cdk/utils';

import {requiredSomeValueByKeysValidator} from './required-some-value-by-keys.validator';
import {assertFormGroup} from './utils/assert-form-group';

const VALIDATOR_TYPE = 'requiredSomeValue';

export function requiredSomeValueValidator<T>(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, VALIDATOR_TYPE);
        const formGroupValue: T = formGroup.getRawValue();
        const keyList: Array<string | keyof T> = Object.keys(formGroupValue as any);
        const error: any = requiredSomeValueByKeysValidator(keyList)(formGroup);

        return isNil(error) ? null : {[VALIDATOR_TYPE]: true};
    };
}
