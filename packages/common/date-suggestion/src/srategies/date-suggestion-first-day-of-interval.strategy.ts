import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { endOfDay, startOfDay } from '@angular-ru/common/date';
import { DateIntervalDescriptor } from '@angular-ru/common/typings';

import { DateSuggestionStrategy } from '../domain/interfaces/date-suggestion-strategy';

@Injectable()
export class DateSuggestionFirstDayOfIntervalStrategy implements DateSuggestionStrategy {
    public updateIntervalFor(control: AbstractControl, { dateFromKey, dateToKey }: DateIntervalDescriptor): void {
        control.patchValue({
            [dateFromKey]: startOfDay(control.value[dateFromKey]),
            [dateToKey]: endOfDay(control.value[dateFromKey])
        });
    }
}
