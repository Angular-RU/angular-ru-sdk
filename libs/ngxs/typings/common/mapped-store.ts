import {
    ɵActionHandlerMetaData as ActionHandlerMetaData,
    ɵPlainObjectOf as PlainObjectOf,
} from '@ngxs/store/internals';

export interface MappedStore {
    name: string;
    isInitialised: boolean;
    actions: PlainObjectOf<ActionHandlerMetaData[]>;
    defaults: any;
    instance: any;
    path: string;
}
