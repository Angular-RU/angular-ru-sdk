import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DateIntervalDescriptor } from '@angular-ru/cdk/typings';

import { endOfDay } from '../../end-of-day';
import { shiftDate } from '../../shift-date/shift-date';
import { startOfDay } from '../../start-of-day';
import { DateSuggestionStrategy } from '../domain/interfaces/date-suggestion-strategy';
import { DayOfWeek, FIRST_DAY_OF_WEEK } from '../tokens/first-day-of-week';

const WEEK_LENGTH: number = 7;

@Injectable()
export class DateSuggestionCalendarWeekStrategy implements DateSuggestionStrategy {
    constructor(@Inject(FIRST_DAY_OF_WEEK) private readonly firstDayOfWeek: DayOfWeek) {}

    public updateIntervalFor(control: AbstractControl, { dateFromKey, dateToKey }: DateIntervalDescriptor): void {
        const localizedDayOfWeek: number = (new Date().getDay() + WEEK_LENGTH - this.firstDayOfWeek) % WEEK_LENGTH;

        control.patchValue({
            [dateFromKey]: startOfDay(shiftDate({ days: -localizedDayOfWeek })),
            [dateToKey]: endOfDay()
        });
    }
}
