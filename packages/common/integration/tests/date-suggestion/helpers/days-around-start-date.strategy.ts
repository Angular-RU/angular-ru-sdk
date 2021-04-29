import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { endOfDay, shiftDate, startOfDay } from '@angular-ru/common/date';
import { DateSuggestionStrategy, DAYS_COUNT } from '@angular-ru/common/date-suggestion';
import { DateIntervalDescriptor } from '@angular-ru/common/typings';

@Injectable()
export class DaysAroundStartDateStrategy implements DateSuggestionStrategy {
    constructor(@Inject(DAYS_COUNT) private readonly daysCount: number) {}

    public updateIntervalFor(control: AbstractControl, { dateFromKey, dateToKey }: DateIntervalDescriptor): void {
        control.patchValue({
            [dateFromKey]: startOfDay(shiftDate({ days: -this.daysCount }, control.value[dateFromKey])),
            [dateToKey]: endOfDay(shiftDate({ days: this.daysCount }, control.value[dateFromKey]))
        });
    }
}
