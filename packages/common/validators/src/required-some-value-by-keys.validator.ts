import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasItems, hasNoItems } from '@angular-ru/common/array';
import { getValueByPath } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsFilled } from '@angular-ru/common/utils';

import { assertFormGroup } from './utils/assert-form-group';

const VALIDATOR_TYPE: string = 'requiredSomeValueByKeys';

export function requiredSomeValueByKeysValidator<T>(keyList: (keyof T | string)[] = []): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, VALIDATOR_TYPE);
        if (hasNoItems(keyList)) {
            return null;
        }
        const formGroupValue: T = formGroup.getRawValue();
        let result: ValidationErrors | null = { [VALIDATOR_TYPE]: true };
        for (const key of keyList) {
            const value: Any = getValueByPath<T>(formGroupValue, key as string);
            if (formValueIsFilled(value)) {
                result = null;
                break;
            }
        }
        return result;
    };
}

function formValueIsFilled(value: Any): boolean {
    return Array.isArray(value) ? hasItems(value) : checkValueIsFilled(value);
}
