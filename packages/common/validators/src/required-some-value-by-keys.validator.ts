import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyList } from '@angular-ru/common/array';
import { getValueByPath } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsFilled } from '@angular-ru/common/utils';

import { assertFormGroup } from './utils/assert-form-group';

const VALIDATOR_TYPE: string = 'requiredSomeValueByKeysValidator';

export function requiredSomeValueByKeysValidator<T>(keyList: (keyof T | string)[] = []): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, VALIDATOR_TYPE);
        if (isEmptyList(keyList)) {
            return null;
        }
        const formGroupValue: T = formGroup.getRawValue();
        let result: ValidationErrors | null = { [VALIDATOR_TYPE]: true };
        for (const key of keyList) {
            const value: Any = getValueByPath<T>(formGroupValue, key as string);
            if (checkValueIsFilled(value)) {
                result = null;
                break;
            }
        }
        return result;
    };
}
