import { Any } from '../../interfaces/table-builder.internal';

export class SelectionRange {
    public start: number | null = null;
    public end: number | null = null;

    public put(index: number): void {
        if (this.start === null) {
            this.start = index;
        } else {
            this.end = index;
        }
    }

    public clear(): void {
        this.start = null;
        this.end = null;
    }

    public sortKeys(): SelectionRange {
        const [start, end]: (number | null)[] = [this.start, this.end].sort(
            (a: number | null, b: number | null): Any => (a ?? 0) - (b ?? 0)
        );
        this.start = start;
        this.end = end;

        return this;
    }

    public selectedRange(): boolean {
        return this.start !== null && this.end !== null;
    }
}
