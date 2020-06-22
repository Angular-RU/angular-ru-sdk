import { EventEmitter, Injectable, NgZone } from '@angular/core';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { OrderedField, TableRow } from '../../interfaces/table-builder.external';
import { Any, KeyMap, Resolver } from '../../interfaces/table-builder.internal';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { sortWorker } from './sort.worker';
import { SortableMessage, SortOrderType } from './sortable.interfaces';

@Injectable()
export class SortableService {
    public definition: KeyMap<SortOrderType> = {};
    public positionMap: KeyMap<number> = {};
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
        return new Promise((resolve: Resolver<TableRow[]>): void => {
            if (this.skipInternalSort) {
                resolve(data);
                return;
            }

            this.thread
                .run<TableRow[], SortableMessage>(sortWorker, { definition: this.definition, source: data })
                .then((sorted: TableRow[]): void => this.idleResolve(resolve, sorted));
        });
    }

    public setDefinition(definition: KeyMap<string>): void {
        this.definition = this.empty ? (definition as KeyMap<SortOrderType>) || {} : this.definition;
    }

    public setSkipSort(skipInternalSort: boolean): void {
        this.skipInternalSort = skipInternalSort;
    }

    public setSortChanges(emitter: EventEmitter<OrderedField[]>): void {
        this.sortChanges = emitter;
    }

    public updateSortKey(key: string): void {
        this.definition = this.updateImmutableDefinitions(key);
        this.triggerOnChanges();
    }

    private triggerOnChanges(): void {
        const orderedFields: OrderedField[] = [];
        this.positionMap = {};

        if (this.sortChanges) {
            Object.entries(this.definition).forEach(([key, ordered]: [string, SortOrderType], index: number): void => {
                this.positionMap[key] = index + 1;
                orderedFields.push({ field: key, order: ordered.toLocaleUpperCase() as Any });
            });

            this.sortableCount = orderedFields.length;
            this.sortChanges.emit(orderedFields);
        }
    }

    private idleResolve(resolve: Resolver<TableRow[]>, sorted: TableRow[]): void {
        this.zone.runOutsideAngular((): void => {
            window.setTimeout((): void => resolve(sorted), TABLE_GLOBAL_OPTIONS.TIME_IDLE);
        });
    }

    private updateImmutableDefinitions(key: string): KeyMap<SortOrderType> {
        const existKey: SortOrderType = this.definition[key];

        if (existKey) {
            if (existKey === SortOrderType.ASC) {
                this.definition[key] = SortOrderType.DESC;
            } else {
                delete this.definition[key];
            }
        } else {
            this.definition[key] = SortOrderType.ASC;
        }

        return { ...this.definition };
    }
}
