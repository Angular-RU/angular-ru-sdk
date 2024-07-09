import {Nullable} from '@angular-ru/cdk/typings';

export const enum TableSimpleChanges {
    SOURCE_KEY = 'source',
    SCHEMA_COLUMNS = 'schemaColumns',
    SKIP_SORT = 'skipSort',
    SORT_TYPES = 'sortTypes',
    FILTER_DEFINITION = 'filterDefinition',
}

export interface DynamicHeightOptions {
    detect: boolean;
    inViewport: boolean;
    footerHeight: number;
    headerHeight: number;
    columnHeight: number;
    sourceLength: number;
    statusRendered: boolean;
    rootHeight: Nullable<string>;
}

export interface RecalculatedStatus {
    recalculateHeight: boolean;
}

export type RowId = string | number;

export interface SelectionStatus {
    status: boolean;
}

export const enum KeyType {
    KEYDOWN = 'keydown',
    KEYUP = 'keyup',
}

export type TableBrowserEvent = Event | MouseEvent | KeyboardEvent;

export interface ResizeEvent {
    event: TableBrowserEvent;
    key: string;
}

export interface TemplateKeys {
    allRenderedKeys: string[];
    simpleRenderedKeys: Set<string>;
    overridingRenderedKeys: Set<string>;
}

export interface MousePosition {
    left: Nullable<number>;
    top: Nullable<number>;
}

export interface BoxView {
    paddingTop: string;
    paddingBottom: string;
}
