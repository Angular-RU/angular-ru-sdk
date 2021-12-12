import { Injectable, Injector } from '@angular/core';
import { checkIsShallowEmpty } from '@angular-ru/cdk/object';
import { isString } from '@angular-ru/cdk/string';
import { Any, Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';
import { ReplaySubject, Subject } from 'rxjs';

import { filterAllWorker } from './filter.worker';
import { FilterDescriptor } from './filter-descriptor';
import { FilterEvent } from './filter-event';
import { FilterStateEvent } from './filter-state-event';
import { FilterWorkerEvent } from './filter-worker-event';
import { Filterable } from './filterable';
import { FilterableMessage } from './filterable-message';
import { TableFilterType } from './table-filter-type';

@Injectable()
export class FilterableService<T> implements Filterable {
    private previousFiltering: boolean = false;
    private readonly thread: WebWorkerThreadService;
    public types: ReadonlyMap<unknown, unknown> = TableFilterType as Any as ReadonlyMap<unknown, unknown>;
    public definition: ReadonlyMap<unknown, unknown> = {} as Any as ReadonlyMap<unknown, unknown>;
    public filterTypeDefinition: ReadonlyMap<unknown, TableFilterType> = {} as Any;
    public readonly filterOpenEvents$: Subject<void> = new Subject();
    public readonly events$: Subject<FilterEvent> = new ReplaySubject(Number.POSITIVE_INFINITY);
    public readonly resetEvents$: Subject<void> = new Subject<void>();
    public state: FilterStateEvent = new FilterStateEvent();
    public filterValue: Nullable<string> = null;
    public filterType: Nullable<string | TableFilterType> = null;
    public filtering: boolean = false;

    constructor(injector: Injector) {
        this.thread = injector.get<WebWorkerThreadService>(WebWorkerThreadService);
    }

    public get globalFilterValue(): Nullable<string> {
        return isString(this.filterValue) ? String(this.filterValue).trim() : null;
    }

    public get filterValueExist(): boolean {
        const keyFilterValues: string = Object.values(this.definition).reduce(
            (acc: string, next: string): string => acc + next,
            ''
        );

        return (this.globalFilterValue?.length ?? 0) > 0 || keyFilterValues.length > 0;
    }

    public setDefinition(descriptors: FilterDescriptor[]): void {
        this.clearDefinitions();
        descriptors.forEach(({ key, value, type }: FilterDescriptor): void => {
            this.filterTypeDefinition = { ...this.filterTypeDefinition, [key]: type };
            this.definition = { ...this.definition, [key]: value };
        });
    }

    public updateFilterTypeBy(type: TableFilterType, key?: Nullable<string>): void {
        if (isNotNil(key)) {
            this.filterTypeDefinition = { ...this.filterTypeDefinition, [key]: type };
        }
    }

    public updateFilterValueBy(value: Any, key?: Nullable<string>): void {
        if (isNotNil(key)) {
            this.definition = { ...this.definition, [key]: value };
        }
    }

    public reset(): void {
        this.clearDefinitions();
        this.filterValue = null;
        this.state = new FilterStateEvent();
        this.filtering = false;
        this.previousFiltering = false;
        this.events$.next({ value: null, type: null });
        this.resetEvents$.next();
    }

    public changeFilteringStatus(): void {
        this.filtering = this.filterValueExist;

        if (this.previousFiltering && !this.filtering) {
            this.events$.next({ value: null, type: null });
        }

        this.previousFiltering = this.filtering;
    }

    public openFilter(key: string, event: MouseEvent): void {
        this.state = { opened: true, key, position: { left: event.clientX, top: event.clientY } };
        this.filterOpenEvents$.next();
    }

    public closeFilter(): void {
        this.state = new FilterStateEvent();
        this.filterOpenEvents$.next();
    }

    // eslint-disable-next-line max-lines-per-function
    public filter(source: T[]): Promise<FilterWorkerEvent<T>> {
        const type: Nullable<string | TableFilterType> = this.filterType;
        const value: Nullable<string> = isString(this.globalFilterValue) ? String(this.globalFilterValue).trim() : null;

        return new Promise(
            // eslint-disable-next-line max-lines-per-function
            (resolve: (value: FilterWorkerEvent<T>) => void): void => {
                const message: FilterableMessage<T> = {
                    source,
                    types: TableFilterType,
                    global: { value, type },
                    columns: {
                        values: this.definition as Any,
                        types: this.filterTypeDefinition as Any,
                        isEmpty: checkIsShallowEmpty(this.definition)
                    }
                };

                this.thread.run<T[], FilterableMessage<T>>(filterAllWorker, message).then((sorted: T[]): void => {
                    resolve({
                        source: sorted,
                        fireSelection: (): void => {
                            this.events$.next({ value, type });
                        }
                    });
                });
            }
        );
    }

    private clearDefinitions(): void {
        this.filterTypeDefinition = {} as Any;
        this.definition = {} as Any;
    }
}
