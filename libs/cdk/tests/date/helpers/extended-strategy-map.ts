import {
    DAYS_COUNT,
    DEFAULT_SUGGESTION_STRATEGY_MAP,
    SuggestionStrategyMap,
} from '@angular-ru/cdk/date';

import {DaysAroundStartDateStrategy} from './days-around-start-date.strategy';
import {
    ExtendedDateIntervalSuggestion,
    SuggestionAddition,
} from './extended-date-interval-suggestion';

export const EXTENDED_STRATEGY_MAP: SuggestionStrategyMap<ExtendedDateIntervalSuggestion> =
    {
        ...DEFAULT_SUGGESTION_STRATEGY_MAP,
        [SuggestionAddition.TWO_DAYS_AROUND_START]: {
            strategy: DaysAroundStartDateStrategy,
            providers: [{provide: DAYS_COUNT, useValue: 2}],
        },
    };
