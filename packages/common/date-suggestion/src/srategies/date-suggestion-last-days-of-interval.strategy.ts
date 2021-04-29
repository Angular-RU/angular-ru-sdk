import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { endOfDay, shiftDate, startOfDay } from '@angular-ru/common/date';
import { DateIntervalDescriptor } from '@angular-ru/common/typings';

import { DateSuggestionStrategy } from '../domain/interfaces/date-suggestion-strategy';
import { DAYS_COUNT } from '../tokens/days-count';

@Injectable()
export class DateSuggestionLastDaysOfIntervalStrategy implements DateSuggestionStrategy {
    constructor(@Inject(DAYS_COUNT) private readonly lastDaysCount: number) {}

    public updateIntervalFor(control: AbstractControl, { dateFromKey, dateToKey }: DateIntervalDescriptor): void {
        const daysShiftAgo: number = -(this.lastDaysCount - 1);
        control.patchValue({
            [dateFromKey]: startOfDay(shiftDate({ days: daysShiftAgo }, control.value[dateToKey])),
            [dateToKey]: endOfDay(control.value[dateToKey])
        });
    }
}
