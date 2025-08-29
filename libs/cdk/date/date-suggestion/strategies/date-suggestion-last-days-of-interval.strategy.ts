import {inject, Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DateIntervalDescriptor} from '@angular-ru/cdk/typings';

import {endOfDay} from '../../end-of-day';
import {shiftDate} from '../../shift-date/shift-date';
import {startOfDay} from '../../start-of-day';
import {DateSuggestionStrategy} from '../domain/interfaces/date-suggestion-strategy';
import {DAYS_COUNT} from '../tokens/days-count';

@Injectable()
export class DateSuggestionLastDaysOfIntervalStrategy implements DateSuggestionStrategy {
    private readonly lastDaysCount = inject(DAYS_COUNT);

    public updateIntervalFor(
        control: AbstractControl,
        {dateFromKey, dateToKey}: DateIntervalDescriptor,
    ): void {
        const daysShiftAgo: number = -(this.lastDaysCount - 1);

        control.patchValue({
            [dateFromKey]: startOfDay(
                shiftDate({days: daysShiftAgo}, control.value[dateToKey]),
            ),
            [dateToKey]: endOfDay(control.value[dateToKey]),
        });
    }
}
