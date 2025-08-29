import type {OutputEmitterRef} from '@angular/core';
import {EmbeddedViewRef, TemplateRef} from '@angular/core';
import {ExcelType} from '@angular-ru/cdk/excel';
import {DeepPartial, Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {TableBrowserEvent} from './table-builder.internal';

// eslint-disable-next-line
export enum ImplicitContext {
    ROW = 'ROW',
    CELL = 'CELL',
}

export type TableClickEventEmitter<T, K> = Nullable<OutputEmitterRef<TableEvent<T, K>>>;

export interface TableCellOptions<T = any> {
    class: Nullable<PlainObject | string[] | string>;
    textBold: boolean;
    nowrap: boolean;
    useDeepPath: boolean;
    style: Nullable<PlainObject>;
    width: Nullable<number>;
    height: Nullable<number>;
    template?: Nullable<TemplateRef<T>>;
    context: ImplicitContext;
    onClick: OutputEmitterRef<any>;
    dblClick: OutputEmitterRef<any>;
}

export interface TableHeadCellOptions {
    headTitle: Nullable<string>;
    emptyHead: boolean;
}

export interface ColumnsSchema<T = any> {
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
    excelType: Nullable<ExcelType>;
}

export interface TableUpdateSchema {
    columns: Array<DeepPartial<ColumnsSchema>>;
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
    isScrolling?: Nullable<boolean>;
    startIndex?: Nullable<number>;
    endIndex?: Nullable<number>;
    bufferOffset?: Nullable<number>;
    scrollTop?: Nullable<number>;
    virtualIndexes?: Nullable<VirtualIndex[]>;
    indexes?: Nullable<number[]>;
    oldIndexes?: Nullable<number[]>;
    diffIndexes?: Nullable<number[]>;
    prevScrollOffsetTop?: Nullable<number>;
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

export type ProduceDisableFn<T> = Nullable<(item: Nullable<PlainObject> | T) => boolean>;

export interface OrderedField {
    field: string;
    order: 'ASC' | 'DESC';
}

export type ExcludePattern<T> = RegExp | keyof T;
