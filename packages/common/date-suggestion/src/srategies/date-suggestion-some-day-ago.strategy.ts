import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { endOfDay, shiftDate, startOfDay } from '@angular-ru/common/date';
import { DateIntervalDescriptor, Timestamp } from '@angular-ru/common/typings';

import { DateSuggestionStrategy } from '../domain/interfaces/date-suggestion-strategy';
import { DAYS_COUNT } from '../tokens/days-count';

@Injectable()
export class DateSuggestionSomeDayAgoStrategy implements DateSuggestionStrategy {
    constructor(@Inject(DAYS_COUNT) private readonly daysCount: number) {}

    public updateIntervalFor(control: AbstractControl, { dateFromKey, dateToKey }: DateIntervalDescriptor): void {
        const day: Timestamp = shiftDate({ days: -this.daysCount });
        control.patchValue({
            [dateFromKey]: startOfDay(day),
            [dateToKey]: endOfDay(day)
        });
    }
}
