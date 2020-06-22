import { Injectable } from '@angular/core';

import { ColumnOptions } from '../../components/common/column-options';
import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { TemplateCellCommon } from '../../directives/rows/template-cell.common';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { ColumnsSchema, ImplicitContext, TableCellOptions } from '../../interfaces/table-builder.external';
import { Any, KeyMap, QueryListRef } from '../../interfaces/table-builder.internal';
import { getValidHtmlBooleanAttribute } from '../../operators/get-valid-html-boolean-attribute';
import { getValidPredicate } from '../../operators/get-valid-predicate';
import { SchemaBuilder } from './schema-builder.class';

@Injectable()
export class TemplateParserService {
    public schema: SchemaBuilder | null = null;
    public templateKeys: Set<string> | null = null;
    public fullTemplateKeys: Set<string> | null = null;
    public overrideTemplateKeys: Set<string> | null = null;
    public columnOptions: ColumnOptions | null = null;
    public compiledTemplates: KeyMap<ColumnsSchema> = {};

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
    public allowedKeyMap: KeyMap<boolean> = {};

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
    public keyMap: KeyMap<boolean> = {};

    private static templateContext(key: string, cell: TemplateCellCommon, options: ColumnOptions): TableCellOptions {
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
        if (this.schema) {
            this.schema.columns = this.schema.columns.map(
                (column: ColumnsSchema): ColumnsSchema =>
                    key === column.key
                        ? {
                              ...column,
                              isVisible: !column.isVisible
                          }
                        : column
            );

            this.synchronizedReference();
        }
    }

    public initialSchema(columnOptions: ColumnOptions): void {
        this.schema = this.schema || new SchemaBuilder();
        this.schema.columns = [];
        this.compiledTemplates = {};
        this.templateKeys = new Set<string>();
        this.overrideTemplateKeys = new Set<string>();
        this.fullTemplateKeys = new Set<string>();
        this.columnOptions = columnOptions || new ColumnOptions();
    }

    // eslint-disable-next-line max-lines-per-function
    public parse(templates: QueryListRef<NgxColumnComponent>): void {
        if (!templates) {
            return;
        }

        templates.forEach((column: NgxColumnComponent): void => {
            const { key, customKey, importantTemplate }: NgxColumnComponent = column;
            const needTemplateCheck: boolean = this.allowedKeyMap[key!] || customKey !== false;

            if (needTemplateCheck) {
                if (importantTemplate !== false) {
                    this.templateKeys?.delete(key!);
                    this.compileColumnMetadata(column);
                    this.overrideTemplateKeys?.add(key!);
                } else if (!this.templateKeys?.has(key!) && !this.overrideTemplateKeys?.has(key!)) {
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
    public compileColumnMetadata(column: NgxColumnComponent): void {
        const { key, th, td, emptyHead, headTitle }: NgxColumnComponent = column;
        const thTemplate: TemplateCellCommon = th || new TemplateHeadThDirective();
        const tdTemplate: TemplateCellCommon = td || new TemplateBodyTdDirective();
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
        const isModel: boolean = this.keyMap[key!];

        this.compiledTemplates[key!] = {
            key,
            isModel,
            isVisible: true,
            excluded: !this.allowedKeyMap[key!],
            verticalLine: getValidHtmlBooleanAttribute(column.verticalLine),
            td: TemplateParserService.templateContext(key!, tdTemplate, this.columnOptions!),
            stickyLeft: getValidHtmlBooleanAttribute(column.stickyLeft),
            stickyRight: getValidHtmlBooleanAttribute(column.stickyRight),
            customColumn: isCustomKey,
            width: getValidPredicate(column.width, this.columnOptions?.width),
            cssClass: getValidPredicate(column.cssClass, this.columnOptions?.cssClass) || [],
            cssStyle: getValidPredicate(column.cssStyle, this.columnOptions?.cssStyle) || [],
            resizable: getValidHtmlBooleanAttribute(
                getValidPredicate(column.isDraggable, this.columnOptions?.isDraggable!)
            ),
            stub: getValidPredicate(this.columnOptions?.stub, column.stub),
            filterable: getValidHtmlBooleanAttribute(
                getValidPredicate(column.isFilterable, this.columnOptions?.isFilterable!)
            ),
            sortable: isModel
                ? getValidHtmlBooleanAttribute(getValidPredicate(column.isSortable, this.columnOptions?.isSortable!))
                : false,
            draggable: canBeAddDraggable
                ? getValidHtmlBooleanAttribute(getValidPredicate(column.isDraggable, this.columnOptions?.isDraggable!))
                : false,
            overflowTooltip: getValidHtmlBooleanAttribute(
                getValidPredicate(
                    this.columnOptions?.overflowTooltip!,
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

    private synchronizedReference(): void {
        this.schema?.columns.forEach((column: ColumnsSchema): void => {
            this.compiledTemplates[column.key!] = column;
        });
    }
}
