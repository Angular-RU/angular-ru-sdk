import {ModuleWithProviders, NgModule} from '@angular/core';

import {DateSuggestionComposer} from './date-suggestion.composer';
import {SuggestionStrategyMap} from './domain/types/suggestion-strategy-map';
import {DEFAULT_SUGGESTION_STRATEGY_MAP} from './properties/default-suggestion-strategy-map';
import {SUGGESTION_STRATEGY_MAP} from './tokens/suggestion-strategy-map';

@NgModule()
export class DateSuggestionModule {
    public static forRoot(
        customSuggestionStrategyMap?: SuggestionStrategyMap,
    ): ModuleWithProviders<DateSuggestionModule> {
        return {
            ngModule: DateSuggestionModule,
            providers: [
                DateSuggestionComposer,
                {
                    provide: SUGGESTION_STRATEGY_MAP,
                    useValue:
                        customSuggestionStrategyMap ?? DEFAULT_SUGGESTION_STRATEGY_MAP,
                },
            ],
        };
    }
}
