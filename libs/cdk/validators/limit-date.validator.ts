import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Timestamp} from '@angular-ru/cdk/typings';

const enum DateLimitValidatorType {
    LIMIT_MAX_INTERVAL = 'maxDateLimitExceeded',
    LIMIT_MIN_INTERVAL = 'minDateLimitExceeded',
}

export function maxDateValidator(maxDate: Timestamp): ValidatorFn {
    return limitDateValidator(maxDate, DateLimitValidatorType.LIMIT_MAX_INTERVAL);
}

export function minDateValidator(maxDate: Timestamp): ValidatorFn {
    return limitDateValidator(maxDate, DateLimitValidatorType.LIMIT_MIN_INTERVAL);
}

function limitDateValidator(
    maxDate: Timestamp,
    type: DateLimitValidatorType,
): ValidatorFn {
    const maxDateTimestamp: number = new Date(maxDate).getTime();

    if (isNaN(maxDateTimestamp)) {
        throw new Error('maxDate value must be correct date');
    }

    return (control: AbstractControl): ValidationErrors | null => {
        const dateTimestamp: number = new Date(control.value).getTime();

        if (isNaN(dateTimestamp)) {
            return null;
        } else {
            const limitExceeded: boolean =
                type === DateLimitValidatorType.LIMIT_MAX_INTERVAL
                    ? dateTimestamp > maxDateTimestamp
                    : dateTimestamp < maxDateTimestamp;

            return limitExceeded ? {[type]: true} : null;
        }
    };
}
