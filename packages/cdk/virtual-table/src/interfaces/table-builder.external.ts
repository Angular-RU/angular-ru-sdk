import { EmbeddedViewRef, EventEmitter, TemplateRef } from '@angular/core';
import { Any, DeepPartial, Nullable, PlainObject } from '@angular-ru/cdk/typings';

import { TableBrowserEvent } from './table-builder.internal';

// eslint-disable-next-line
export enum ImplicitContext {
    ROW = 'ROW',
    CELL = 'CELL'
}

export type TableClickEventEmitter<T, K> = Nullable<EventEmitter<TableEvent<T, K>>>;

export interface TableCellOptions<T = Any> {
    class: Nullable<string | string[] | PlainObject>;
    textBold: boolean;
    nowrap: boolean;
    useDeepPath: boolean;
    style: Nullable<PlainObject>;
    width: Nullable<number>;
    height: Nullable<number>;
    template?: Nullable<TemplateRef<T>>;
    context: ImplicitContext;
    onClick: EventEmitter<Any>;
    dblClick: EventEmitter<Any>;
}

export interface TableHeadCellOptions {
    headTitle: Nullable<string>;
    emptyHead: boolean;
}

export interface ColumnsSchema<T = Any> {
    key: Nullable<string>;
    td: TableCellOptions<T>;
    th: TableCellOptions<T> & TableHeadCellOptions;
    width?: Nullable<number>;
    cssStyle: string[];
    cssClass: string[];
    stickyLeft: boolean;
    stickyRight: boolean;
    resizable: boolean;
    sortable: boolean;
    filterable: boolean;
    draggable: boolean;
    customColumn: boolean;
    verticalLine: boolean;
    isModel: boolean;
    excluded: boolean;
    isVisible: boolean;
    overflowTooltip: boolean;
    stub?: Nullable<string>;
}

export interface TableUpdateSchema {
    columns: DeepPartial<ColumnsSchema>[];
    generalTableSettings?: GeneralTableSettings;
    name: Nullable<string>;
    version: number;
}

export interface GeneralTableSettings {
    expanded?: Nullable<boolean>;
}

export interface TableEvent<T, K> {
    row: T;
    value: Nullable<K>;
    event: TableBrowserEvent;
    preventDefault: () => void;
}

export interface ContextItemEvent {
    preventDefault(): void;
}

export interface ViewPortInfo {
    isScrolling?: boolean;
    startIndex?: number;
    endIndex?: number;
    bufferOffset?: number;
    scrollTop?: number;
    virtualIndexes?: VirtualIndex[];
    indexes?: number[];
    oldIndexes?: number[];
    diffIndexes?: number[];
    prevScrollOffsetTop?: number;
}

export interface VirtualIndex {
    position: number;
    stripped: boolean;
    offsetTop: number;
}

export interface VirtualContext<T> {
    $implicit: T;
    virtualIndex: VirtualIndex;
    index: number;
}

export type InternalVirtualRef<T> = [T, EmbeddedViewRef<VirtualContext<T>>];

export interface CalculateRange {
    start: number;
    end: number;
    bufferOffset: number;
    force: boolean;
}

export type ProduceDisableFn<T> = Nullable<(item: T | Nullable<PlainObject>) => boolean>;

export interface OrderedField {
    field: string;
    order: 'ASC' | 'DESC';
}

export type ExcludePattern<T> = keyof T | RegExp;
