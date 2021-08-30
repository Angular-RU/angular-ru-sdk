import { Injectable, QueryList } from '@angular/core';
import { toNumber } from '@angular-ru/common/number';
import { shallowMapObject } from '@angular-ru/common/object';
import { Any, Nullable, PlainObjectOf } from '@angular-ru/common/typings';
import { checkValueIsFilled, fallbackIfEmpty, isNil, isNotNil, isTrue } from '@angular-ru/common/utils';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { ColumnOptionsDirective } from '../../directives/column-options.directive';
import { AbstractTemplateCellCommonDirective } from '../../directives/rows/abstract-template-cell-common.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { ColumnsSchema, ImplicitContext, TableCellOptions } from '../../interfaces/table-builder.external';
import { getValidHtmlBooleanAttribute } from '../../operators/get-valid-html-boolean-attribute';
import { getValidPredicate } from '../../operators/get-valid-predicate';
import { SchemaBuilder } from './schema-builder.class';

@Injectable()
export class TemplateParserService<T> {
    public schema: Nullable<SchemaBuilder> = null;
    public templateKeys: Nullable<Set<string>> = null;
    public fullTemplateKeys: Nullable<Set<string>> = null;
    public overrideTemplateKeys: Nullable<Set<string>> = null;
    public columnOptions: Nullable<ColumnOptionsDirective> = null;
    public compiledTemplates: PlainObjectOf<ColumnsSchema> = {};

    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *    </table-builder>
     *    ------------------------
     *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true }
     */
    public allowedKeyMap: PlainObjectOf<boolean> = {};

    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *    </table-builder>
     *    ------------------------
     *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true, 'description': false }
     */
    public keyMap: PlainObjectOf<boolean> = {};

    private static templateContext<U>(
        key: string,
        cell: AbstractTemplateCellCommonDirective<U>,
        options: ColumnOptionsDirective
    ): TableCellOptions {
        return {
            textBold: cell.bold,
            template: cell.template,
            class: cell.cssClasses,
            style: cell.cssStyles,
            width: cell.width,
            height: cell.height,
            onClick: cell.onClick,
            dblClick: cell.dblClick,
            useDeepPath: key.includes('.'),
            context: getValidHtmlBooleanAttribute(cell.row) ? ImplicitContext.ROW : ImplicitContext.CELL,
            nowrap: getValidHtmlBooleanAttribute(getValidPredicate(options.nowrap, cell.nowrap))
        };
    }

    public toggleColumnVisibility(key: string): void {
        if (isNotNil(this.schema)) {
            this.schema.columns = this.schema.columns.map((column: ColumnsSchema): ColumnsSchema => {
                if (key === column.key) {
                    return { ...column, isVisible: !column.isVisible };
                } else {
                    return column;
                }
            });

            this.updateComputedWithSchema();
        }
    }

    public updateColumnsSchema(patch: PlainObjectOf<Partial<ColumnsSchema>>): void {
        if (isNotNil(this.schema)) {
            this.schema.columns = this.schema.columns.map((column: ColumnsSchema): ColumnsSchema => {
                if (isNotNil(column.key)) {
                    return { ...column, ...patch[column.key] };
                } else {
                    return column;
                }
            });
        }
        this.updateComputedWithSchema();
    }

    public initialSchema(columnOptions: ColumnOptionsDirective): void {
        this.schema = this.schema ?? new SchemaBuilder();
        this.schema.columns = [];
        this.compiledTemplates = {};
        this.templateKeys = new Set<string>();
        this.overrideTemplateKeys = new Set<string>();
        this.fullTemplateKeys = new Set<string>();
        this.columnOptions = columnOptions ?? new ColumnOptionsDirective();
    }

    // eslint-disable-next-line max-lines-per-function
    public parse(templates?: QueryList<NgxColumnComponent<T>>): void {
        if (isNil(templates)) {
            return;
        }

        templates.forEach((column: NgxColumnComponent<T>): void => {
            const { key, customKey, importantTemplate }: NgxColumnComponent<T> = column;
            const needTemplateCheck: boolean = this.allowedKeyMap[key!] ?? customKey !== false;

            if (needTemplateCheck) {
                if (importantTemplate !== false) {
                    this.templateKeys?.delete(key!);
                    this.compileColumnMetadata(column);
                    this.overrideTemplateKeys?.add(key!);
                } else if (!isTrue(this.templateKeys?.has(key!)) && !isTrue(this.overrideTemplateKeys?.has(key!))) {
                    this.compileColumnMetadata(column);
                    this.templateKeys?.add(key!);
                }

                this.fullTemplateKeys?.add(key!);
            }
        });
    }

    public mutateColumnSchema(key: string, partialSchema: Partial<ColumnsSchema>): void {
        for (const option of Object.keys(partialSchema)) {
            (this.compiledTemplates[key] as Any)[option] = (partialSchema as Any)[option];
        }
    }

    // eslint-disable-next-line complexity,max-lines-per-function
    public compileColumnMetadata(column: NgxColumnComponent<T>): void {
        const { key, th, td, emptyHead, headTitle }: NgxColumnComponent<T> = column;
        const thTemplate: AbstractTemplateCellCommonDirective<T> = th ?? new TemplateHeadThDirective<T>();
        const tdTemplate: AbstractTemplateCellCommonDirective<T> = td ?? new TemplateBodyTdDirective<T>();
        const isEmptyHead: boolean = getValidHtmlBooleanAttribute(emptyHead);
        const thOptions: TableCellOptions = TemplateParserService.templateContext(
            key!,
            thTemplate,
            this.columnOptions!
        );
        const stickyLeft: boolean = getValidHtmlBooleanAttribute(column.stickyLeft);
        const stickyRight: boolean = getValidHtmlBooleanAttribute(column.stickyRight);
        const isCustomKey: boolean = getValidHtmlBooleanAttribute(column.customKey);
        const canBeAddDraggable: boolean = !(stickyLeft || stickyRight);
        const isModel: boolean = checkValueIsFilled(this.keyMap[key as string]);

        this.compiledTemplates[key!] = {
            key,
            isModel,
            isVisible: true,
            excluded: !checkValueIsFilled(this.allowedKeyMap[key!]),
            verticalLine: getValidHtmlBooleanAttribute(column.verticalLine),
            td: TemplateParserService.templateContext(key!, tdTemplate, this.columnOptions!),
            stickyLeft: getValidHtmlBooleanAttribute(column.stickyLeft),
            stickyRight: getValidHtmlBooleanAttribute(column.stickyRight),
            customColumn: isCustomKey,
            width: fallbackIfEmpty(toNumber(column.width ?? this.columnOptions?.width), null),
            cssClass: getValidPredicate(column.cssClass, this.columnOptions?.cssClass) ?? [],
            cssStyle: getValidPredicate(column.cssStyle, this.columnOptions?.cssStyle) ?? [],
            resizable: getValidHtmlBooleanAttribute(
                getValidPredicate(column.isDraggable, this.columnOptions?.isDraggable)
            ),
            stub: getValidPredicate(this.columnOptions?.stub, column.stub),
            filterable: getValidHtmlBooleanAttribute(
                getValidPredicate(column.isFilterable, this.columnOptions?.isFilterable)
            ),
            sortable: isModel
                ? getValidHtmlBooleanAttribute(getValidPredicate(column.isSortable, this.columnOptions?.isSortable))
                : false,
            draggable: canBeAddDraggable
                ? getValidHtmlBooleanAttribute(getValidPredicate(column.isDraggable, this.columnOptions?.isDraggable))
                : false,
            overflowTooltip: getValidHtmlBooleanAttribute(
                getValidPredicate(
                    this.columnOptions?.overflowTooltip,
                    typeof column.overflowTooltip === 'boolean' ? column.overflowTooltip : !isCustomKey
                )
            ),
            th: {
                ...thOptions,
                headTitle,
                emptyHead: isEmptyHead,
                template: isEmptyHead ? null : thOptions.template
            }
        };
    }

    public exportSchema(): PlainObjectOf<Partial<ColumnsSchema>> {
        return shallowMapObject(
            this.compiledTemplates,
            (column: ColumnsSchema): Partial<ColumnsSchema> => ({
                key: column.key,
                width: column.width,
                isVisible: column.isVisible,
                isModel: column.isModel
            })
        );
    }

    private updateComputedWithSchema(): void {
        this.schema?.columns.forEach((column: ColumnsSchema): void => {
            this.compiledTemplates[column.key!] = column;
        });
    }
}
