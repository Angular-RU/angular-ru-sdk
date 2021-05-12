import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';

import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../template-parser/template-parser.service';

@Injectable()
export class DraggableService<T> {
    constructor(private readonly parser: TemplateParserService<T>) {}

    private get columns(): ColumnsSchema[] {
        return this.parser.schema?.columns ?? [];
    }

    public drop(previousKey: string | undefined, currentKey: string | undefined): void {
        const previousIndex: number = this.columns.findIndex(
            (column: ColumnsSchema): boolean => column.key === previousKey
        );

        const currentIndex: number = this.columns.findIndex(
            (column: ColumnsSchema): boolean => column.key === currentKey
        );

        if (this.canDropped(previousIndex, currentIndex)) {
            if (currentIndex === this.columns.length - 1) {
                const currentColumn: ColumnsSchema | undefined = this.columns[currentIndex];
                const previousColumn: ColumnsSchema | undefined = this.columns[previousIndex];

                if (currentColumn && previousColumn) {
                    currentColumn.width = previousColumn.width;
                    previousColumn.width = null;
                }
            }

            moveItemInArray(this.columns, previousIndex, currentIndex);
        }
    }

    public canDropped(previousIndex: number, currentIndex: number): boolean {
        const previous: ColumnsSchema | undefined = this.columns[previousIndex];
        const current: ColumnsSchema | undefined = this.columns[currentIndex];

        const previousIsDraggable: boolean = !!previous?.draggable;
        const currentIsDraggable: boolean = !!current?.draggable;
        const isSticky: boolean = !!(
            previous?.stickyLeft ||
            current?.stickyLeft ||
            previous?.stickyRight ||
            current?.stickyRight
        );

        return previousIsDraggable && currentIsDraggable && !isSticky;
    }
}
