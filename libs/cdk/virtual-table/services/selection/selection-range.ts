import {Nullable} from '@angular-ru/cdk/typings';

export class SelectionRange {
    public start: Nullable<number> = null;
    public end: Nullable<number> = null;

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
        const [start, end]: Array<Nullable<number>> = [this.start, this.end].sort(
            (a: Nullable<number>, b: Nullable<number>): any => (a ?? 0) - (b ?? 0),
        );

        this.start = start;
        this.end = end;

        return this;
    }

    public selectedRange(): boolean {
        return this.start !== null && this.end !== null;
    }
}
