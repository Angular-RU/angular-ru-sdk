import { TableRow } from '../../interfaces/table-builder.external';
import { Fn, KeyMap, MousePosition } from '../../interfaces/table-builder.internal';

export interface FilterGlobalOpts {
    value: string | null;
    type: TableFilterType | null;
}

export interface FilterColumnsOpts {
    isEmpty: boolean;
    values: KeyMap<string>;
    types: KeyMap<TableFilterType>;
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

export interface FilterableMessage {
    source: TableRow[];
    types: typeof TableFilterType;
    global: FilterGlobalOpts | null;
    columns: FilterColumnsOpts | null;
}

export interface FilterEvent {
    value: string | null;
    type: TableFilterType | null;
}

export class FilterStateEvent {
    public key: string | null = null;
    public opened: boolean | null = null;
    public position: MousePosition = { left: null, top: null };
}

export interface FilterWorkerEvent {
    source: TableRow[];
    fireSelection: Fn;
}
