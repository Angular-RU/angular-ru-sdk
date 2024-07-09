import {PlainObjectOf} from '@angular-ru/cdk/typings';
import {isNotNil, isTruthy} from '@angular-ru/cdk/utils';

import {ProduceDisableFn} from '../../interfaces/table-builder.external';
import {RowId} from '../../interfaces/table-builder.internal';

export class SelectionMap<T> {
    private readonly selectionSet: Set<RowId> = new Set<RowId>();
    public isAll: boolean = false;
    public entries: PlainObjectOf<boolean> = {};
    public selectedList: RowId[] = [];
    public produceDisableFn: ProduceDisableFn<T> = null;

    public get size(): number {
        return this.selectionSet.size;
    }

    public get isIndeterminate(): boolean {
        return this.hasValue() && !this.isAll;
    }

    public generateImmutableEntries(): void {
        this.selectedList = Array.from(this.selectionSet.values());
        const newEntries: PlainObjectOf<boolean> = {};

        for (const key of this.selectedList) {
            newEntries[key] = true;
        }

        this.entries = newEntries;
    }

    public hasValue(): boolean {
        return this.size > 0;
    }

    public get(key?: RowId): boolean {
        return isNotNil(key) ? this.selectionSet.has(key) : false;
    }

    public select(key: RowId, row: T, emit: boolean): boolean {
        if (isTruthy(this.produceDisableFn?.(row))) {
            return false;
        }

        this.selectionSet.add(key);

        if (emit) {
            this.generateImmutableEntries();
        }

        return true;
    }

    public toggle(key: string | number, row: T, emit: boolean): void {
        if (this.has(key)) {
            this.delete(key, emit);
        } else {
            this.select(key, row, emit);
        }
    }

    public delete(key: RowId, emit: boolean): void {
        this.selectionSet.delete(key);

        if (emit) {
            this.generateImmutableEntries();
        }
    }

    public has(key: RowId): boolean {
        return this.selectionSet.has(key);
    }

    public clear(): void {
        this.selectionSet.clear();
        this.entries = {};
        this.selectedList = [];
        this.isAll = false;
    }
}
