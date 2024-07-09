import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {Nullable, PlainObjectOf, SortOrderType} from '@angular-ru/cdk/typings';
import {isNotNil, isTruthy} from '@angular-ru/cdk/utils';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {TABLE_GLOBAL_OPTIONS} from '../../config/table-global-options';
import {OrderedField} from '../../interfaces/table-builder.external';
import {sortWorker} from './sort.worker';
import {SortableMessage} from './sortable-message';

@Injectable()
export class SortableService<T> {
    private skipInternalSort: boolean = false;
    private sortChanges: Nullable<EventEmitter<OrderedField[]>> = null;
    public definition: PlainObjectOf<SortOrderType> = {};
    public positionMap: PlainObjectOf<number> = {};
    public sortableCount: number = 0;

    constructor(
        private readonly thread: WebWorkerThreadService,
        private readonly zone: NgZone,
    ) {}

    public get empty(): boolean {
        return Object.keys(this.definition).length === 0;
    }

    public get notEmpty(): boolean {
        return !this.empty;
    }

    public sort(data: T[]): Promise<T[]> {
        return new Promise((resolve: (value: T[]) => void): void => {
            if (this.skipInternalSort) {
                resolve(data);

                return;
            }

            this.thread
                .run<
                    T[],
                    SortableMessage<T>
                >(sortWorker, {definition: this.definition, source: data})
                .then((sorted: T[]): void => this.idleResolve(resolve, sorted));
        });
    }

    public setDefinition(definition: PlainObjectOf<SortOrderType>): void {
        this.definition = definition;
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

        if (isNotNil(this.sortChanges)) {
            for (const [index, [key, ordered]] of Object.entries(
                this.definition,
            ).entries()) {
                this.positionMap[key] = index + 1;
                orderedFields.push({
                    field: key,
                    order: ordered.toLocaleUpperCase() as OrderedField['order'],
                });
            }

            this.sortableCount = orderedFields.length;
            this.sortChanges.emit(orderedFields);
        }
    }

    private idleResolve(resolve: (value: T[]) => void, sorted: T[]): void {
        this.zone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout(
                (): void => resolve(sorted),
                TABLE_GLOBAL_OPTIONS.TIME_IDLE,
            );
        });
    }

    private updateDefinitionByKeyImmutably(key: string): PlainObjectOf<SortOrderType> {
        const definition: PlainObjectOf<SortOrderType> = {...this.definition};
        const existKey: Nullable<SortOrderType> = definition[key];

        if (isTruthy(existKey)) {
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
