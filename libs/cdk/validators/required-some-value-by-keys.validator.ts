import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {hasItems, hasNoItems} from '@angular-ru/cdk/array';
import {getValueByPath} from '@angular-ru/cdk/object';
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

import {assertFormGroup} from './utils/assert-form-group';

const VALIDATOR_TYPE = 'requiredSomeValueByKeys';

export function requiredSomeValueByKeysValidator<T>(
    keyList: Array<string | keyof T> = [],
): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, VALIDATOR_TYPE);

        if (hasNoItems(keyList)) {
            return null;
        }

        const formGroupValue: T = formGroup.getRawValue();
        let result: ValidationErrors | null = {[VALIDATOR_TYPE]: true};

        for (const key of keyList) {
            const value: any = getValueByPath<T>(formGroupValue, key as string);

            if (formValueIsFilled(value)) {
                result = null;
                break;
            }
        }

        return result;
    };
}

function formValueIsFilled(value: any): boolean {
    return Array.isArray(value) ? hasItems(value) : checkValueIsFilled(value);
}
