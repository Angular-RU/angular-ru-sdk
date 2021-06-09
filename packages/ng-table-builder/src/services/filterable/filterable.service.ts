import { Injectable, Injector } from '@angular/core';
import { checkIsShallowEmpty } from '@angular-ru/common/object';
import { isString } from '@angular-ru/common/string';
import { Any } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { ReplaySubject, Subject } from 'rxjs';

import { filterAllWorker } from './filter.worker';
import { FilterEvent } from './filter-event';
import { FilterStateEvent } from './filter-state-event';
import { FilterWorkerEvent } from './filter-worker-event';
import { Filterable } from './filterable';
import { FilterableMessage } from './filterable-message';
import { TableFilterType } from './table-filter-type';

@Injectable()
export class FilterableService<T> implements Filterable {
    public types: ReadonlyMap<unknown, unknown> = TableFilterType as Any as ReadonlyMap<unknown, unknown>;
    public definition: ReadonlyMap<unknown, unknown> = {} as Any as ReadonlyMap<unknown, unknown>;
    public filterTypeDefinition: ReadonlyMap<unknown, TableFilterType> = {} as Any;
    public readonly filterOpenEvents: Subject<void> = new Subject();
    public readonly events: Subject<FilterEvent> = new ReplaySubject();
    public readonly resetEvents: Subject<void> = new Subject<void>();
    public state: FilterStateEvent = new FilterStateEvent();
    public filterValue: string | null = null;
    public filterType: string | TableFilterType | null = null;
    public filtering: boolean = false;
    private previousFiltering: boolean = false;
    private readonly thread: WebWorkerThreadService;

    constructor(injector: Injector) {
        this.thread = injector.get<WebWorkerThreadService>(WebWorkerThreadService);
    }

    public get globalFilterValue(): string | null {
        return (isString(this.filterValue) as boolean) ? String(this.filterValue).trim() : null;
    }

    public get filterValueExist(): boolean {
        const keyFilterValues: string = Object.values(this.definition).reduce(
            (acc: string, next: string): string => acc + next,
            ''
        );

        return (this.globalFilterValue?.length ?? 0) > 0 || keyFilterValues.length > 0;
    }

    public updateFilterTypeBy(type: TableFilterType, key?: string | null): void {
        if (isNotNil(key)) {
            this.filterTypeDefinition = { ...this.filterTypeDefinition, [key]: type };
        }
    }

    public updateFilterValueBy(value: Any, key?: string | null): void {
        if (isNotNil(key)) {
            this.definition = { ...this.definition, [key]: value };
        }
    }

    public reset(): void {
        this.definition = {} as Any;
        this.filterValue = null;
        this.state = new FilterStateEvent();
        this.filterTypeDefinition = {} as Any;
        this.filtering = false;
        this.previousFiltering = false;
        this.events.next({ value: null, type: null });
        this.resetEvents.next();
    }

    public changeFilteringStatus(): void {
        this.filtering = this.filterValueExist;

        if (this.filtering !== this.previousFiltering) {
            this.events.next({ value: null, type: null });
        }

        this.previousFiltering = this.filtering;
    }

    public openFilter(key: string, event: MouseEvent): void {
        this.state = { opened: true, key, position: { left: event.clientX, top: event.clientY } };
        this.filterOpenEvents.next();
        event.stopPropagation();
        event.preventDefault();
    }

    public closeFilter(): void {
        this.state = new FilterStateEvent();
        this.filterOpenEvents.next();
    }

    // eslint-disable-next-line max-lines-per-function
    public filter(source: T[]): Promise<FilterWorkerEvent<T>> {
        const type: string | TableFilterType | null = this.filterType;
        const value: string | null = (isString(this.globalFilterValue) as boolean)
            ? String(this.globalFilterValue).trim()
            : null;

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
                            this.events.next({ value, type });
                        }
                    });
                });
            }
        );
    }
}
