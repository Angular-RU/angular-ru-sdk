import {InjectionToken} from '@angular/core';

import {SuggestionStrategyMap} from '../domain/types/suggestion-strategy-map';

export const SUGGESTION_STRATEGY_MAP: InjectionToken<SuggestionStrategyMap> =
    new InjectionToken<SuggestionStrategyMap>(
        '[SUGGESTION_STRATEGY_MAP]: Suggestion strategy map',
    );
