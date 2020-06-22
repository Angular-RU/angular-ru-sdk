import { ProduceDisableFn, TableRow } from '../../interfaces/table-builder.external';
import { KeyMap, RowId } from '../../interfaces/table-builder.internal';

export class SelectionMap {
    public isAll: boolean = false;
    public toggledAll: boolean = false;
    public entries: KeyMap<boolean> = {};
    public produceDisableFn: ProduceDisableFn = null;
    private readonly map: Map<RowId, boolean> = new Map<RowId, boolean>();

    public get size(): number {
        return this.map.size;
    }

    public generateImmutableEntries(): void {
        const arrayBuffer: [RowId, boolean][] = Array.from(this.map.entries());
        const newEntries: KeyMap<boolean> = {};

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

    public get(key: RowId): boolean {
        return this.map.get(key) || false;
    }

    public select(key: RowId, row: TableRow, emit: boolean): void {
        if (this.produceDisableFn && this.produceDisableFn(row)) {
            return;
        }

        this.map.set(key, true);

        if (emit) {
            this.generateImmutableEntries();
        }
    }

    public toggle(key: string | number, row: TableRow, emit: boolean): void {
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
