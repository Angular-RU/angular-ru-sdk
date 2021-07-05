import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, NativeDateModule } from '@angular/material/core';
import { endOfDay, shiftDate, startOfDay } from '@angular-ru/common/date';
import {
    DateSuggestionComposer,
    DateSuggestionModule,
    DEFAULT_SUGGESTION_STRATEGY_MAP,
    DefaultDateIntervalSuggestion
} from '@angular-ru/common/date';
import { DateIntervalDescriptor } from '@angular-ru/common/typings';

describe('[TEST]: Trim Input', () => {
    let composer: DateSuggestionComposer<DefaultDateIntervalSuggestion>;
    const descriptor: DateIntervalDescriptor = { dateFromKey: 'dateFrom', dateToKey: 'dateTo' };
    let form: FormGroup;

    const mockToday: Date = new Date('28 Apr 2021 12:00:00');
    const mockFirstWeekdays = [
        { firstDayOfWeekNumber: 0, firstDayOfWeek: new Date('25 Apr 2021 12:00:00') },
        { firstDayOfWeekNumber: 1, firstDayOfWeek: new Date('26 Apr 2021 12:00:00') },
        { firstDayOfWeekNumber: 2, firstDayOfWeek: new Date('27 Apr 2021 12:00:00') },
        { firstDayOfWeekNumber: 3, firstDayOfWeek: new Date('28 Apr 2021 12:00:00') },
        { firstDayOfWeekNumber: 4, firstDayOfWeek: new Date('22 Apr 2021 12:00:00') },
        { firstDayOfWeekNumber: 5, firstDayOfWeek: new Date('23 Apr 2021 12:00:00') },
        { firstDayOfWeekNumber: 6, firstDayOfWeek: new Date('24 Apr 2021 12:00:00') }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DateSuggestionModule.forRoot(), NativeDateModule]
        }).compileComponents();

        composer = TestBed.inject(DateSuggestionComposer);
        form = new FormGroup({
            [descriptor.dateFromKey]: new FormControl(startOfDay(shiftDate({ days: -1 }))),
            [descriptor.dateToKey]: new FormControl(endOfDay())
        });
    });

    it('should return list of default strategies', function () {
        expect(composer.getSuggestions()).toEqual(Object.keys(DEFAULT_SUGGESTION_STRATEGY_MAP));
    });

    it('should set date interval based on LastFewDaysStrategy', function () {
        composer.getStrategy(DefaultDateIntervalSuggestion.LAST_3_DAYS).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(shiftDate({ days: -2 })),
            dateTo: endOfDay()
        });

        composer.getStrategy(DefaultDateIntervalSuggestion.LAST_7_DAYS).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(shiftDate({ days: -6 })),
            dateTo: endOfDay()
        });

        composer.getStrategy(DefaultDateIntervalSuggestion.LAST_60_DAYS).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(shiftDate({ days: -59 })),
            dateTo: endOfDay()
        });
    });

    it('should set date interval based on SomeDayAgoStrategy', function () {
        composer.getStrategy(DefaultDateIntervalSuggestion.TODAY).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(),
            dateTo: endOfDay()
        });

        composer.getStrategy(DefaultDateIntervalSuggestion.YESTERDAY).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(shiftDate({ days: -1 })),
            dateTo: endOfDay(shiftDate({ days: -1 }))
        });
    });

    it('should set date interval based on FirstDayOfIntervalStrategy', function () {
        const mockStart: Date = new Date('10 Apr 2021 12:00:00');
        form.controls[descriptor.dateFromKey]?.setValue(mockStart);
        composer.getStrategy(DefaultDateIntervalSuggestion.FIRST_DAY_OF_INTERVAL).updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(mockStart),
            dateTo: endOfDay(mockStart)
        });
    });

    it('should set date interval based on LastDaysOfIntervalStrategy', function () {
        const mockEnd: Date = new Date('10 Apr 2021 12:00:00');
        form.controls[descriptor.dateToKey]?.setValue(mockEnd);
        composer
            .getStrategy(DefaultDateIntervalSuggestion.LAST_180_DAYS_OF_INTERVAL)
            .updateIntervalFor(form, descriptor);
        expect(form.getRawValue()).toEqual({
            dateFrom: startOfDay(shiftDate({ days: -179 }, mockEnd)),
            dateTo: endOfDay(mockEnd)
        });
    });

    it.each(mockFirstWeekdays)(
        'Set calendar week as interval (first day of week is %s)',
        function ({ firstDayOfWeekNumber, firstDayOfWeek }) {
            const dateAdapter: DateAdapter<unknown> = TestBed.inject(DateAdapter);
            // mocking locale day of week
            jest.spyOn(dateAdapter, 'getFirstDayOfWeek').mockImplementation(() => firstDayOfWeekNumber);

            // mocking today's week day
            jest.useFakeTimers('modern');
            jest.setSystemTime(mockToday);

            expect(new Date().getDay()).toBe(3); // wednesday

            composer.getStrategy(DefaultDateIntervalSuggestion.CALENDAR_WEEK).updateIntervalFor(form, descriptor);
            expect(form.getRawValue()).toEqual({
                dateFrom: startOfDay(firstDayOfWeek),
                dateTo: endOfDay(mockToday)
            });
            expect(form.getRawValue().dateFrom.getDay()).toBe(dateAdapter.getFirstDayOfWeek());
        }
    );
});
