import { DefaultDateIntervalSuggestion } from '@angular-ru/common/date';

export const enum SuggestionAddition {
    TWO_DAYS_AROUND_START = 'TWO_DAYS_AROUND_START'
}

export type ExtendedDateIntervalSuggestion = DefaultDateIntervalSuggestion | SuggestionAddition;
