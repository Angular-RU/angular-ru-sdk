import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { NativeDateModule } from '@angular/material/core';
import { endOfDay, shiftDate, startOfDay } from '@angular-ru/common/date';
import { DateSuggestionComposer, DateSuggestionModule, DefaultDateIntervalSuggestion } from '@angular-ru/common/date';
import { DateIntervalDescriptor } from '@angular-ru/common/typings';

import { ExtendedDateIntervalSuggestion, SuggestionAddition } from './helpers/extended-date-interval-suggestion';
import { EXTENDED_STRATEGY_MAP } from './helpers/extended-strategy-map';

describe('[TEST]: Trim Input', () => {
    let composer: DateSuggestionComposer<ExtendedDateIntervalSuggestion>;
    let form: FormGroup;
    const descriptor: DateIntervalDescriptor = { dateFromKey: 'dateFrom', dateToKey: 'dateTo' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DateSuggestionModule.forRoot(EXTENDED_STRATEGY_MAP), NativeDateModule]
        }).compileComponents();

        composer = TestBed.inject(DateSuggestionComposer);
        form = new FormGroup({
            [descriptor.dateFromKey]: new FormControl(startOfDay(shiftDate({ days: -1 }))),
            [descriptor.dateToKey]: new FormControl(endOfDay())
        });
    });

    it('should return list of default strategies', function () {
        expect(composer.getSuggestions()).toEqual(Object.keys(EXTENDED_STRATEGY_MAP));
    });

    it('should set date interval based on default LastFewDaysStrategy', function () {
        composer.getStrategy(DefaultDateIntervalSuggestion.LAST_3_DAYS).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(shiftDate({ days: -2 })),
            dateTo: endOfDay()
        });
    });

    it('should set date interval based on default LastFewDaysStrategy', function () {
        const dateFrom: Date = form.getRawValue()[descriptor.dateFromKey];
        composer.getStrategy(SuggestionAddition.TWO_DAYS_AROUND_START).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(shiftDate({ days: -2 }, dateFrom)),
            dateTo: endOfDay(shiftDate({ days: 2 }, dateFrom))
        });
    });
});
