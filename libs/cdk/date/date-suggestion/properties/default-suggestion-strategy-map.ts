import {DefaultDateIntervalSuggestion} from '../domain/enums/default-date-interval-suggestion';
import {SuggestionStrategyMap} from '../domain/types/suggestion-strategy-map';
import {DateSuggestionCalendarWeekStrategy} from '../strategies/date-suggestion-calendar-week.strategy';
import {DateSuggestionFirstDayOfIntervalStrategy} from '../strategies/date-suggestion-first-day-of-interval.strategy';
import {DateSuggestionLastDaysOfIntervalStrategy} from '../strategies/date-suggestion-last-days-of-interval.strategy';
import {DateSuggestionLastFewDaysStrategy} from '../strategies/date-suggestion-last-few-days.strategy';
import {DateSuggestionSomeDayAgoStrategy} from '../strategies/date-suggestion-some-day-ago.strategy';
import {DAYS_COUNT} from '../tokens/days-count';

export const DEFAULT_SUGGESTION_STRATEGY_MAP: SuggestionStrategyMap<DefaultDateIntervalSuggestion> =
    {
        [DefaultDateIntervalSuggestion.TODAY]: {
            strategy: DateSuggestionSomeDayAgoStrategy,
            providers: [{provide: DAYS_COUNT, useValue: 0}],
        },
        [DefaultDateIntervalSuggestion.YESTERDAY]: {
            strategy: DateSuggestionSomeDayAgoStrategy,
            providers: [{provide: DAYS_COUNT, useValue: 1}],
        },
        [DefaultDateIntervalSuggestion.CALENDAR_WEEK]: {
            strategy: DateSuggestionCalendarWeekStrategy,
        },
        [DefaultDateIntervalSuggestion.LAST_3_DAYS]: {
            strategy: DateSuggestionLastFewDaysStrategy,
            providers: [{provide: DAYS_COUNT, useValue: 3}],
        },
        [DefaultDateIntervalSuggestion.LAST_7_DAYS]: {
            strategy: DateSuggestionLastFewDaysStrategy,
            providers: [{provide: DAYS_COUNT, useValue: 7}],
        },
        [DefaultDateIntervalSuggestion.LAST_60_DAYS]: {
            strategy: DateSuggestionLastFewDaysStrategy,
            providers: [{provide: DAYS_COUNT, useValue: 60}],
        },
        [DefaultDateIntervalSuggestion.FIRST_DAY_OF_INTERVAL]: {
            strategy: DateSuggestionFirstDayOfIntervalStrategy,
        },
        [DefaultDateIntervalSuggestion.LAST_180_DAYS_OF_INTERVAL]: {
            strategy: DateSuggestionLastDaysOfIntervalStrategy,
            providers: [{provide: DAYS_COUNT, useValue: 180}],
        },
    };
