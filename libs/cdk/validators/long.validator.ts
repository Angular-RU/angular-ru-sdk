import {AbstractControl, ValidatorFn} from '@angular/forms';
import {BigDecimal} from '@angular-ru/cdk/big-decimal';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

type ComparableRangeResult = -1 | 0 | 1;

const MIN_LONG_VALUE: BigDecimal = new BigDecimal('-9223372036854775808');
const MAX_LONG_VALUE: BigDecimal = new BigDecimal('9223372036854775807');

export function longValidator(): ValidatorFn {
    return (control: AbstractControl): PlainObject | null => {
        if (isNil(control.value)) {
            return null;
        }

        return isLong(control.value.toString().trim()) ? null : {long: true};
    };
}

function isLong(value: Nullable<number | string>): boolean {
    if (isNil(value) || value.toString().match(/[^\d-]/g)) {
        return false;
    }

    const decimal: BigDecimal = new BigDecimal(value);
    const comparedLeft: ComparableRangeResult = decimal.compareTo(MIN_LONG_VALUE);
    const comparedRight: ComparableRangeResult = decimal.compareTo(MAX_LONG_VALUE);

    return !(
        (comparedLeft === 1 && comparedRight === 1) ||
        (comparedLeft === -1 && comparedRight === -1)
    );
}
