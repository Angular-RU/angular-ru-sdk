import {moveItemInArray} from '@angular/cdk/drag-drop';
import {inject, Injectable} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil, isTrue} from '@angular-ru/cdk/utils';

import {ColumnsSchema} from '../../interfaces/table-builder.external';
import {TemplateParserService} from '../template-parser/template-parser.service';

@Injectable()
export class DraggableService<T> {
    private readonly parser = inject<TemplateParserService<T>>(TemplateParserService);

    private get columns(): ColumnsSchema[] {
        return this.parser.schema?.columns ?? [];
    }

    public drop(previousKey: Nullable<string>, currentKey: Nullable<string>): void {
        const previousIndex: number = this.columns.findIndex(
            (column: ColumnsSchema): boolean => column.key === previousKey,
        );

        const currentIndex: number = this.columns.findIndex(
            (column: ColumnsSchema): boolean => column.key === currentKey,
        );

        if (this.canDropped(previousIndex, currentIndex)) {
            if (currentIndex === this.columns.length - 1) {
                const currentColumn: Nullable<ColumnsSchema> = this.columns[currentIndex];
                const previousColumn: Nullable<ColumnsSchema> =
                    this.columns[previousIndex];

                if (isNotNil(currentColumn) && isNotNil(previousColumn)) {
                    currentColumn.width = previousColumn.width;
                    previousColumn.width = null;
                }
            }

            moveItemInArray(this.columns, previousIndex, currentIndex);
        }
    }

    public canDropped(previousIndex: number, currentIndex: number): boolean {
        const previous: Nullable<ColumnsSchema> = this.columns[previousIndex];
        const current: Nullable<ColumnsSchema> = this.columns[currentIndex];

        const previousIsDraggable: boolean = isTrue(previous?.draggable);
        const currentIsDraggable: boolean = isTrue(current?.draggable);

        const isSticky: boolean =
            isTrue(previous?.stickyLeft) ||
            isTrue(current?.stickyLeft) ||
            isTrue(previous?.stickyRight) ||
            isTrue(current?.stickyRight);

        return previousIsDraggable && currentIsDraggable && !isSticky;
    }
}
