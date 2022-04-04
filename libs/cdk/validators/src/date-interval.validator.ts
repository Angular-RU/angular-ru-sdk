import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateIntervalDescriptor, Nullable, PlainObject, Timestamp } from '@angular-ru/cdk/typings';
import { checkSomeValueIsEmpty, isNotNil } from '@angular-ru/cdk/utils';

import { assertFormGroup } from './utils/assert-form-group';
import { getDateInterval } from './utils/get-date-interval';

export type DateIntervalValidatorDescriptor = DateIntervalDescriptor;

const enum DateIntervalValidatorType {
    LIMIT_MAX_INTERVAL = 'maxDateIntervalLimit',
    LIMIT_MIN_INTERVAL = 'minDateIntervalLimit',
    ORDERED_INTERVAL = 'orderedInterval'
}

const DATE_INTERVAL_VALIDATOR: string = 'DateIntervalValidator';

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

export function orderedIntervalValidator({ dateFromKey, dateToKey }: DateIntervalValidatorDescriptor): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, DATE_INTERVAL_VALIDATOR);
        const validatorType: DateIntervalValidatorType = DateIntervalValidatorType.ORDERED_INTERVAL;
        const formGroupValue: PlainObject = formGroup.getRawValue();
        const from: Timestamp | null = formGroupValue[dateFromKey];
        const to: Timestamp | null = formGroupValue[dateToKey];

        if (checkSomeValueIsEmpty(from, to)) {
            return null;
        }

        return (from ?? 0) > (to ?? 0) ? ({ [validatorType]: true } as ValidationErrors) : null;
    };
}

function dateIntervalValidator(
    intervalLimit: Timestamp,
    { dateFromKey, dateToKey }: DateIntervalValidatorDescriptor,
    type: DateIntervalValidatorType
): ValidatorFn {
    const intervalLimitTimestamp: number = new Date(intervalLimit).getTime();

    return (formGroup: AbstractControl): ValidationErrors | null => {
        assertFormGroup(formGroup, DATE_INTERVAL_VALIDATOR);
        const formGroupValue: PlainObject = formGroup.getRawValue();
        const interval: Nullable<number> = getDateInterval(formGroupValue[dateFromKey], formGroupValue[dateToKey]);
        const limitExceeded: boolean =
            isNotNil(interval) &&
            (type === DateIntervalValidatorType.LIMIT_MAX_INTERVAL
                ? interval > intervalLimitTimestamp
                : interval < intervalLimitTimestamp);

        return limitExceeded ? { [type]: true } : null;
    };
}
