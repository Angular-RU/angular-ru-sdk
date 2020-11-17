import { Any, DeepPartial, PlainObject } from '@angular-ru/common/typings';
import { EmbeddedViewRef, EventEmitter, TemplateRef } from '@angular/core';

import { TableBrowserEvent } from './table-builder.internal';

export type TableRow<T = Any> =
    | Any
    | {
          [key: string]: T;
      };

// eslint-disable-next-line
export enum ImplicitContext {
    ROW = 'ROW',
    CELL = 'CELL'
}

export type TableClickEventEmitter = EventEmitter<TableEvent> | null;

export interface TableCellOptions<T = Any> {
    class: string | string[] | PlainObject | null;
    textBold: boolean;
    nowrap: boolean;
    useDeepPath: boolean;
    style: PlainObject | null;
    width: number | null;
    height: number | null;
    template?: TemplateRef<T> | null;
    context: ImplicitContext;
    onClick: EventEmitter<Any>;
    dblClick: EventEmitter<Any>;
}

export interface TableHeadCellOptions {
    headTitle: string | null;
    emptyHead: boolean;
}

export interface ColumnsSchema<T = Any> {
    key: string | null;
    td: TableCellOptions<T>;
    th: TableCellOptions<T> & TableHeadCellOptions;
    width?: string | number | null;
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
    stub?: string | null;
}

export interface TableUpdateSchema {
    columns: DeepPartial<ColumnsSchema>[];
    name: string | null;
    version: number;
}

export interface TableEvent<T = Any> {
    value: T;
    row: TableRow;
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

export interface VirtualContext {
    $implicit: TableRow;
    virtualIndex: VirtualIndex;
    index: number;
}

export type InternalVirtualRef = [TableRow, EmbeddedViewRef<VirtualContext>];

export interface CalculateRange {
    start: number;
    end: number;
    bufferOffset: number;
    force: boolean;
}

export type ProduceDisableFn = ((item: TableRow) => boolean) | null;

export interface OrderedField {
    field: string;
    order: 'ASC' | 'DESC';
}
