import {StaticProvider, Type} from '@angular/core';

import {DateSuggestionStrategy} from './date-suggestion-strategy';

export interface SuggestionStrategyDescriptor {
    strategy: Type<DateSuggestionStrategy>;
    providers?: StaticProvider[];
}
