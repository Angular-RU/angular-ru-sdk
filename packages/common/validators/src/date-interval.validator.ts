import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PlainObject, Timestamp } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { assertFormGroup } from './utils/assert-form-group';
import { getDateInterval } from './utils/get-date-interval';

export interface DateIntervalValidatorDescriptor {
    dateFromKey: string;
    dateToKey: string;
}

const enum DateIntervalValidatorType {
    LIMIT_MAX_INTERVAL = 'maxDateIntervalLimit',
    LIMIT_MIN_INTERVAL = 'minDateIntervalLimit'
}

export function dateMaxIntervalValidator(
    intervalLimit: Timestamp,
    descriptor: DateIntervalValidatorDescriptor
): ValidatorFn {
    return dateIntervalValidator(intervalLimit, descriptor, DateIntervalValidatorType.LIMIT_MAX_INTERVAL);
}

export function dateMinIntervalValidator(
    intervalLimit: Timestamp,
    descriptor: DateIntervalValidatorDescriptor
): ValidatorFn {
    return dateIntervalValidator(intervalLimit, descriptor, DateIntervalValidatorType.LIMIT_MIN_INTERVAL);
}

function dateIntervalValidator(
    intervalLimit: Timestamp,
    { dateFromKey, dateToKey }: DateIntervalValidatorDescriptor,
    type: DateIntervalValidatorType
): ValidatorFn {
    const intervalLimitTimestamp: number = new Date(intervalLimit).getTime();

    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, 'DateIntervalValidator');
        const formGroupValue: PlainObject = formGroup.getRawValue();
        const interval: number | null = getDateInterval(formGroupValue[dateFromKey], formGroupValue[dateToKey]);
        const limitExceeded: boolean =
            isNotNil(interval) &&
            (type === DateIntervalValidatorType.LIMIT_MAX_INTERVAL
                ? interval > intervalLimitTimestamp
                : interval < intervalLimitTimestamp);
        return limitExceeded ? { [type]: true } : null;
    };
}
