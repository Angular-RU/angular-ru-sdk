import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { PlainObjectOf, SortOrderType } from '@angular-ru/common/typings';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { OrderedField, TableRow } from '../../interfaces/table-builder.external';
import { sortWorker } from './sort.worker';
import { SortableMessage } from './sortable.interfaces';

@Injectable()
export class SortableService {
    public definition: PlainObjectOf<SortOrderType> = {};
    public positionMap: PlainObjectOf<number> = {};
    public sortableCount: number = 0;
    private skipInternalSort: boolean = false;
    private sortChanges: EventEmitter<OrderedField[]> | null = null;

    constructor(private readonly thread: WebWorkerThreadService, private readonly zone: NgZone) {}

    public get empty(): boolean {
        return Object.keys(this.definition).length === 0;
    }

    public get notEmpty(): boolean {
        return !this.empty;
    }

    public sort(data: TableRow[]): Promise<TableRow[]> {
        return new Promise((resolve: (value: TableRow[]) => void): void => {
            if (this.skipInternalSort) {
                resolve(data);
                return;
            }

            this.thread
                .run<TableRow[], SortableMessage>(sortWorker, { definition: this.definition, source: data })
                .then((sorted: TableRow[]): void => this.idleResolve(resolve, sorted));
        });
    }

    public setDefinition(definition: PlainObjectOf<string>): void {
        this.definition = definition as PlainObjectOf<SortOrderType>;
    }

    public setSkipSort(skipInternalSort: boolean): void {
        this.skipInternalSort = skipInternalSort;
    }

    public setSortChanges(emitter: EventEmitter<OrderedField[]>): void {
        this.sortChanges = emitter;
    }

    public updateSortKey(key: string): void {
        this.setDefinition(this.updateDefinitionByKeyImmutably(key));
        this.triggerOnChanges();
    }

    private triggerOnChanges(): void {
        const orderedFields: OrderedField[] = [];
        this.positionMap = {};

        if (this.sortChanges) {
            Object.entries(this.definition).forEach(([key, ordered]: [string, SortOrderType], index: number): void => {
                this.positionMap[key] = index + 1;
                orderedFields.push({ field: key, order: ordered.toLocaleUpperCase() as OrderedField['order'] });
            });

            this.sortableCount = orderedFields.length;
            this.sortChanges.emit(orderedFields);
        }
    }

    private idleResolve(resolve: (value: TableRow[]) => void, sorted: TableRow[]): void {
        this.zone.runOutsideAngular((): void => {
            window.setTimeout((): void => resolve(sorted), TABLE_GLOBAL_OPTIONS.TIME_IDLE);
        });
    }

    private updateDefinitionByKeyImmutably(key: string): PlainObjectOf<SortOrderType> {
        const definition: PlainObjectOf<SortOrderType> = { ...this.definition };
        const existKey: SortOrderType = definition[key];

        if (existKey) {
            if (existKey === SortOrderType.ASC) {
                definition[key] = SortOrderType.DESC;
            } else {
                delete definition[key];
            }
        } else {
            definition[key] = SortOrderType.ASC;
        }

        return definition;
    }
}
