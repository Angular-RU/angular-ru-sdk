import { SuggestionStrategyDescriptor } from '../interfaces/suggestion-strategy-descriptor';

export type SuggestionStrategyMap<Keys extends string | symbol | number = string | symbol | number> = {
    [P in Keys]: SuggestionStrategyDescriptor;
};
