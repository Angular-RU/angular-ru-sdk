export const enum TableSimpleChanges {
    SOURCE_KEY = 'source',
    SCHEMA_COLUMNS = 'schemaColumns',
    SKIP_SORT = 'skipSort',
    SORT_TYPES = 'sortTypes'
}

export interface DynamicHeightOptions {
    detect: boolean;
    inViewport: boolean;
    footerHeight: number;
    headerHeight: number;
    columnHeight: number;
    sourceLength: number;
    statusRendered: boolean;
    height: string | number | null;
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
    KEYUP = 'keyup'
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
    left: number | null;
    top: number | null;
}

export interface BoxView {
    paddingTop: string;
    paddingBottom: string;
}
