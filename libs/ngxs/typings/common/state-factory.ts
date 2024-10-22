import type {MappedStore} from './mapped-store';

export interface StateFactory {
    hydrateActionMetasMap(mappedStore: MappedStore): void;
    states: MappedStore[];
}
