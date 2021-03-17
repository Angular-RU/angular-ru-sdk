import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { assertFormGroup } from './utils/assert-form-group';

const VALIDATOR_TYPE: string = 'complexRequiredValidator';

export function complexRequiredValidator(controlList: string[]): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, VALIDATOR_TYPE);
        const formGroupValue: PlainObject = formGroup.getRawValue();
        const valueList: Any[] = controlList.map((control: string): Any => formGroupValue[control]);
        if (valueList.some(isNotNil)) {
            return null;
        }
        return { [VALIDATOR_TYPE]: true };
    };
}
