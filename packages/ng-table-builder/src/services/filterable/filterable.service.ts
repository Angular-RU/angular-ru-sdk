import { ApplicationRef, Injectable, Injector, NgZone } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { TableRow } from '../../interfaces/table-builder.external';
import { KeyMap, Resolver } from '../../interfaces/table-builder.internal';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { UtilsService } from '../utils/utils.service';
import { filterAllWorker } from './filter.worker';
import {
    FilterableMessage,
    FilterEvent,
    FilterStateEvent,
    FilterWorkerEvent,
    TableFilterType
} from './filterable.interface';

const { TIME_IDLE }: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

interface FilterableInterface {
    reset(): void;
}

@Injectable()
export class FilterableService implements FilterableInterface {
    public filterValue: string | null = null;
    public definition: KeyMap<string> = {};
    public state: FilterStateEvent = new FilterStateEvent();
    public types: KeyMap = TableFilterType;
    public readonly filterOpenEvents: Subject<void> = new Subject();
    public readonly events: Subject<FilterEvent> = new ReplaySubject();
    public readonly resetEvents: Subject<void> = new Subject<void>();
    public filterType: TableFilterType | null = null;
    public filterTypeDefinition: KeyMap<TableFilterType> = {};
    public filtering: boolean = false;
    private previousFiltering: boolean = false;
    private readonly thread: WebWorkerThreadService;
    private readonly utils: UtilsService;
    private readonly ngZone: NgZone;
    private readonly app: ApplicationRef;

    constructor(injector: Injector) {
        this.app = injector.get<ApplicationRef>(ApplicationRef);
        this.ngZone = injector.get<NgZone>(NgZone);
        this.utils = injector.get<UtilsService>(UtilsService);
        this.thread = injector.get<WebWorkerThreadService>(WebWorkerThreadService);
    }

    public get globalFilterValue(): string | null {
        return this.filterValue ? String(this.filterValue).trim() : null;
    }

    public get filterValueExist(): boolean {
        const keyFilterValues: string = Object.values(this.definition).reduce(
            (acc: string, next: string): string => acc + next,
            ''
        );

        return (this.globalFilterValue && this.globalFilterValue.length > 0) || keyFilterValues.length > 0;
    }

    public reset(): void {
        this.definition = {};
        this.filterValue = null;
        this.state = new FilterStateEvent();
        this.filterTypeDefinition = {};
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
    public filter(source: TableRow[]): Promise<FilterWorkerEvent> {
        const type: TableFilterType | null = this.filterType;
        const value: string | null = this.globalFilterValue ? String(this.globalFilterValue).trim() : null;

        return new Promise(
            // eslint-disable-next-line max-lines-per-function
            (resolve: Resolver<FilterWorkerEvent>): void => {
                const message: FilterableMessage = {
                    source,
                    types: TableFilterType,
                    global: { value, type },
                    columns: {
                        values: this.definition,
                        types: this.filterTypeDefinition,
                        isEmpty: this.checkIsEmpty(this.definition)
                    }
                };

                this.thread
                    .run<TableRow[], FilterableMessage>(filterAllWorker, message)
                    .then((sorted: TableRow[]): void => {
                        this.ngZone.runOutsideAngular((): void => {
                            window.setTimeout((): void => {
                                resolve({
                                    source: sorted,
                                    fireSelection: (): void => {
                                        // eslint-disable-next-line max-nested-callbacks
                                        window.setTimeout((): void => {
                                            this.events.next({ value, type });
                                            this.app.tick();
                                        }, TIME_IDLE);
                                    }
                                });
                            }, TIME_IDLE);
                        });
                    });
            }
        );
    }

    private checkIsEmpty(definition: KeyMap<string>): boolean {
        return Object.keys(this.utils.clean(definition)).length === 0;
    }
}
