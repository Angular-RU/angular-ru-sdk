import {SuggestionStrategyDescriptor} from '../interfaces/suggestion-strategy-descriptor';
import {StrategyKey} from './strategy-key';

export type SuggestionStrategyMap<Keys extends StrategyKey = StrategyKey> = Record<
    Keys,
    SuggestionStrategyDescriptor
>;
