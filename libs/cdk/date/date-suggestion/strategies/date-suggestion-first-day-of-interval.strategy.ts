import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DateIntervalDescriptor} from '@angular-ru/cdk/typings';

import {endOfDay} from '../../end-of-day';
import {startOfDay} from '../../start-of-day';
import {DateSuggestionStrategy} from '../domain/interfaces/date-suggestion-strategy';

@Injectable()
export class DateSuggestionFirstDayOfIntervalStrategy implements DateSuggestionStrategy {
    public updateIntervalFor(
        control: AbstractControl,
        {dateFromKey, dateToKey}: DateIntervalDescriptor,
    ): void {
        control.patchValue({
            [dateFromKey]: startOfDay(control.value[dateFromKey]),
            [dateToKey]: endOfDay(control.value[dateFromKey]),
        });
    }
}
