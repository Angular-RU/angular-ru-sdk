import {SuggestionStrategyDescriptor} from '../interfaces/suggestion-strategy-descriptor';
import {StrategyKey} from './strategy-key';

export type SuggestionStrategyMap<Keys extends StrategyKey = StrategyKey> = {
    [P in Keys]: SuggestionStrategyDescriptor;
};
