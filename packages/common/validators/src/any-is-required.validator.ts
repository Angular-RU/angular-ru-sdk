import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { isAny } from '@angular-ru/common/utils';

import { assertFormGroup } from './utils/assert-form-group';

const VALIDATOR_TYPE: string = 'isAnyRequiredValidator';

export function isAnyRequiredValidator(controlList: string[]): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, VALIDATOR_TYPE);
        const formGroupValue: PlainObject = formGroup.getRawValue();
        const valueList: Any[] = controlList.map((control: string): Any => formGroupValue[control]);
        if (isAny(valueList)) {
            return null;
        }
        return { [VALIDATOR_TYPE]: true };
    };
}
