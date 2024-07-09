import {InjectionToken} from '@angular/core';

import {SuggestionStrategyMap} from '../domain/types/suggestion-strategy-map';

export const SUGGESTION_STRATEGY_MAP: InjectionToken<SuggestionStrategyMap> =
    new InjectionToken<SuggestionStrategyMap>('Suggestion strategy map');
