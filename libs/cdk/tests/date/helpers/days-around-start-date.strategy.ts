import {Inject, Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {
    DateSuggestionStrategy,
    DAYS_COUNT,
    endOfDay,
    shiftDate,
    startOfDay,
} from '@angular-ru/cdk/date';
import {DateIntervalDescriptor} from '@angular-ru/cdk/typings';

@Injectable()
export class DaysAroundStartDateStrategy implements DateSuggestionStrategy {
    constructor(@Inject(DAYS_COUNT) private readonly daysCount: number) {}

    public updateIntervalFor(
        control: AbstractControl,
        {dateFromKey, dateToKey}: DateIntervalDescriptor,
    ): void {
        control.patchValue({
            [dateFromKey]: startOfDay(
                shiftDate({days: -this.daysCount}, control.value[dateFromKey]),
            ),
            [dateToKey]: endOfDay(
                shiftDate({days: this.daysCount}, control.value[dateFromKey]),
            ),
        });
    }
}
