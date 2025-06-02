import {Inject, Injectable, Injector} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

import {DateSuggestionStrategy} from './domain/interfaces/date-suggestion-strategy';
import {SuggestionStrategyDescriptor} from './domain/interfaces/suggestion-strategy-descriptor';
import {StrategyKey} from './domain/types/strategy-key';
import {SuggestionStrategyMap} from './domain/types/suggestion-strategy-map';
import {SUGGESTION_STRATEGY_MAP} from './tokens/suggestion-strategy-map';

@Injectable()
export class DateSuggestionComposer<StrategyKeys extends StrategyKey = StrategyKey> {
    constructor(
        @Inject(SUGGESTION_STRATEGY_MAP)
        private readonly suggestionStrategyMap: SuggestionStrategyMap<StrategyKeys>,
        private readonly injector: Injector,
    ) {}

    public getSuggestions(): StrategyKeys[] {
        return Object.keys(this.suggestionStrategyMap) as StrategyKeys[];
    }

    public getStrategy(type: StrategyKeys): DateSuggestionStrategy {
        const descriptor: SuggestionStrategyDescriptor = this.suggestionStrategyMap[type];
        const strategy: Nullable<DateSuggestionStrategy> = Injector.create({
            providers: [
                {provide: descriptor.strategy, useClass: descriptor.strategy},
                ...(descriptor.providers ?? []),
            ],
            parent: this.injector,
        }).get(descriptor.strategy, null, {optional: true});

        if (isNil(strategy)) {
            throw new Error('This type of date suggestion is not supported');
        }

        return strategy;
    }
}
