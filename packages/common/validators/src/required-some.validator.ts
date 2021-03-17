import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyList } from '@angular-ru/common/array';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { assertFormGroup } from './utils/assert-form-group';

const VALIDATOR_TYPE: string = 'requiredSomeValidator';

export function requiredSomeValidator(of?: string[]): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, VALIDATOR_TYPE);
        if (isEmptyList(of)) {
            return null;
        }
        const formGroupValue: PlainObject = formGroup.getRawValue();
        const valueList: Any[] = of?.map((control: string): Any => formGroupValue[control]) ?? [];
        if (valueList.some(isNotNil)) {
            return null;
        }
        return { [VALIDATOR_TYPE]: true };
    };
}
