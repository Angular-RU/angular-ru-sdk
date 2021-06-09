import { PlainObjectOf } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { ProduceDisableFn } from '../../interfaces/table-builder.external';
import { RowId } from '../../interfaces/table-builder.internal';

export class SelectionMap<T> {
    public isAll: boolean = false;
    public entries: PlainObjectOf<boolean> = {};
    public produceDisableFn: ProduceDisableFn<T> = null;
    private readonly map: Map<RowId, boolean> = new Map<RowId, boolean>();

    public get size(): number {
        return this.map.size;
    }

    public generateImmutableEntries(): void {
        const arrayBuffer: [RowId, boolean][] = Array.from(this.map.entries());
        const newEntries: PlainObjectOf<boolean> = {};

        arrayBuffer.forEach(([key, value]: [RowId, boolean]): void => {
            newEntries[key] = value;
        });

        this.entries = newEntries;
    }

    public hasValue(): boolean {
        return this.size > 0;
    }

    public get isIndeterminate(): boolean {
        return this.hasValue() && !this.isAll;
    }

    public get(key?: RowId): boolean {
        return isNotNil(key) ? this.map.get(key) ?? false : false;
    }

    public select(key: RowId, row: T, emit: boolean): boolean {
        if (this.produceDisableFn && this.produceDisableFn(row)) {
            return false;
        }

        this.map.set(key, true);

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
        this.map.delete(key);
        if (emit) {
            this.generateImmutableEntries();
        }
    }

    public has(key: RowId): boolean {
        return this.map.has(key);
    }

    public clear(): void {
        this.map.clear();
        this.entries = {};
        this.isAll = false;
    }
}
