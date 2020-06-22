import { QueryList } from '@angular/core';

// eslint-disable-next-line
export enum PrimaryKey {
    ID = 'id'
}

// eslint-disable-next-line
export enum TableSimpleChanges {
    SOURCE_KEY = 'source',
    SCHEMA_COLUMNS = 'schemaColumns'
}

export interface DynamicHeightOptions {
    detect: boolean;
    inViewport: boolean;
    height: number | null;
    footerHeight: number;
    headerHeight: number;
    columnHeight: number;
    statusRendered: boolean;
    sourceLength: number;
}

export interface RecalculatedStatus {
    recalculateHeight: boolean;
}

export interface KeyMap<T = Any> {
    [key: string]: T;
}

export type RowId = string | number;

export type Fn<T = Any, U = Any> = (...args: T[]) => U;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any; // NOSONAR

export interface SelectionStatus {
    status: boolean;
}

// eslint-disable-next-line
export enum KeyType {
    KEYDOWN = 'keydown',
    KEYUP = 'keyup'
}

export type TableBrowserEvent = Event | MouseEvent | KeyboardEvent;

export interface ResizeEvent {
    event: TableBrowserEvent;
    key: string;
}

// Bug: 'QueryList' is imported from external module '@angular/core' but never used
export type QueryListRef<T> = QueryList<T>;

export interface TemplateKeys {
    allRenderedKeys: string[];
    simpleRenderedKeys: Set<string>;
    overridingRenderedKeys: Set<string>;
}

export type Resolver<T> = (value?: T | PromiseLike<T>) => void;

export interface MousePosition {
    left: number | null;
    top: number | null;
}

export type DeepPartial<T = Any> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends readonly (infer R)[]
        ? readonly DeepPartial<R>[]
        : DeepPartial<T[P]>;
};

export interface BoxView {
    paddingTop: string;
    paddingBottom: string;
}
