import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateIntervalDescriptor } from '@angular-ru/cdk/typings';

import { endOfDay } from '../../end-of-day';
import { shiftDate } from '../../shift-date/shift-date';
import { startOfDay } from '../../start-of-day';
import { DateSuggestionStrategy } from '../domain/interfaces/date-suggestion-strategy';

const WEEK_LENGTH: number = 7;

@Injectable()
export class DateSuggestionCalendarWeekStrategy implements DateSuggestionStrategy {
    constructor(private readonly dateAdapter: DateAdapter<Date>) {}

    public updateIntervalFor(control: AbstractControl, { dateFromKey, dateToKey }: DateIntervalDescriptor): void {
        const localizedDayOfWeek: number =
            (new Date().getDay() + WEEK_LENGTH - this.dateAdapter.getFirstDayOfWeek()) % WEEK_LENGTH;

        control.patchValue({
            [dateFromKey]: startOfDay(shiftDate({ days: -localizedDayOfWeek })),
            [dateToKey]: endOfDay()
        });
    }
}
