import { Fn, PlainObjectOf } from '@angular-ru/common/typings';

import { MousePosition } from '../../interfaces/table-builder.internal';

export interface FilterGlobalOpts {
    value: string | null;
    type: string | TableFilterType | null;
}

export interface FilterColumnsOpts {
    isEmpty: boolean;
    values: PlainObjectOf<string>;
    types: PlainObjectOf<TableFilterType>;
}

// eslint-disable-next-line
export enum TableFilterType {
    START_WITH = 'START_WITH',
    END_WITH = 'END_WITH',
    CONTAINS = 'CONTAINS',
    DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
    EQUALS = 'EQUALS',
    DOES_NOT_EQUAL = 'DOES_NOT_EQUAL'
}

export interface FilterableMessage<T> {
    source: T[];
    types: typeof TableFilterType;
    global: FilterGlobalOpts | null;
    columns: FilterColumnsOpts | null;
}

export interface FilterEvent {
    value: string | null;
    type: string | TableFilterType | null;
}

export class FilterStateEvent {
    public key: string | null = null;
    public opened: boolean | null = null;
    public position: MousePosition = { left: null, top: null };
}

export interface FilterWorkerEvent<T> {
    source: T[];
    fireSelection: Fn;
}

export interface FilterableInterface {
    reset(): void;
}
