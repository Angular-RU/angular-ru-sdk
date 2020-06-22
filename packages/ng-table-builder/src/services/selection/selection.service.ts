import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ProduceDisableFn, TableRow } from '../../interfaces/table-builder.external';
import { Fn, KeyMap, KeyType, PrimaryKey, RowId, SelectionStatus } from '../../interfaces/table-builder.internal';
import { checkValueIsEmpty } from '../../operators/check-value-is-empty';
import { SelectionMap } from './selection';
import { SelectionRange } from './selection-range';

@Injectable()
export class SelectionService implements OnDestroy {
    public selectionModel: SelectionMap = new SelectionMap();
    public range: SelectionRange = new SelectionRange();
    public selectionStart: SelectionStatus = { status: false };
    public primaryKey: string = PrimaryKey.ID;
    public selectionTaskIdle: number | null = null;
    public onChanges: Subject<void> = new Subject<void>();
    private readonly handler: KeyMap<Fn> = {};

    constructor(private readonly ngZone: NgZone) {}

    public listenShiftKey(): void {
        this.listenShiftKeyByType(KeyType.KEYDOWN);
        this.listenShiftKeyByType(KeyType.KEYUP);
    }

    public unListenShiftKey(): void {
        this.removeListenerByType(KeyType.KEYDOWN);
        this.removeListenerByType(KeyType.KEYUP);
    }

    public setProducerDisableFn(producer: ProduceDisableFn): void {
        this.selectionModel.produceDisableFn = producer;
    }

    public ngOnDestroy(): void {
        this.unListenShiftKey();
    }

    public invalidate(): void {
        this.range.clear();
        this.selectionStart = { status: false };
        this.selectionModel.clear();
        this.onChanges.next();
    }

    public toggleAll(rows: TableRow[] | null): void {
        window.clearInterval(this.selectionTaskIdle!);

        if (this.selectionModel.toggledAll) {
            this.selectionModel.toggledAll = false;
            this.selectionModel.clear();
        } else {
            this.selectionModel.toggledAll = true;
            (rows ?? []).forEach((row: TableRow): void => this.selectionModel.select(this.getIdByRow(row), row, false));
        }

        this.checkIsAllSelected(rows ?? []);
    }

    public reset(): void {
        this.selectionModel.clear();
        this.range.clear();
        this.onChanges.next();
    }

    public toggle(row: TableRow): void {
        this.ngZone.runOutsideAngular((): void => window.clearInterval(this.selectionTaskIdle!));
        this.selectionModel.toggle(this.getIdByRow(row), row, true);
        this.onChanges.next();
    }

    public selectRow(row: TableRow, event: MouseEvent, rows: TableRow[]): void {
        const { shiftKey, ctrlKey }: MouseEvent = event;
        const index: number = rows.findIndex(
            (item: TableRow): boolean => item[this.primaryKey] === row[this.primaryKey]
        );

        if (shiftKey) {
            this.multipleSelectByShiftKeydown(index, rows);
        } else if (ctrlKey) {
            this.multipleSelectByCtrlKeydown(row, index);
        } else {
            this.singleSelect(row, index);
        }

        this.checkIsAllSelected(rows);
    }

    public getIdByRow(row: TableRow): RowId {
        const id: RowId = row[this.primaryKey];

        if (checkValueIsEmpty(id)) {
            throw new Error(
                `Can't select item, make sure you pass the correct primary key, or you forgot enable selection
                <ngx-table-builder enable-selection primary-key="fieldId" />
                `
            );
        }

        return id;
    }

    public shiftKeyDetectSelection({ shiftKey }: KeyboardEvent): void {
        this.selectionStart = { status: shiftKey };
    }

    private listenShiftKeyByType(type: KeyType): void {
        this.ngZone.runOutsideAngular((): void => {
            this.handler[type] = ({ shiftKey }: KeyboardEvent): void => {
                this.selectionStart = { status: shiftKey };
            };
            window.addEventListener(type, this.handler[type], true);
        });
    }

    private removeListenerByType(type: string): void {
        window.removeEventListener(type, this.handler[type], true);
    }

    private checkIsAllSelected(rows: TableRow[]): void {
        this.selectionModel.isAll = rows.length === this.selectionModel.size;
        this.selectionModel.generateImmutableEntries();
        this.onChanges.next();
    }

    private multipleSelectByShiftKeydown(index: number, rows: TableRow[]): void {
        this.selectionModel.clear();
        this.range.put(index);
        const selectedRange: boolean = this.range.selectedRange();

        if (selectedRange) {
            const { start, end }: SelectionRange = this.range.sortKeys();
            for (let i: number = start!; i <= end!; ++i) {
                this.selectionModel.select(this.getIdByRow(rows[i]), rows[i], false);
            }
        }
    }

    private multipleSelectByCtrlKeydown(row: TableRow, index: number): void {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row), row, true);
    }

    private singleSelect(row: TableRow, index: number): void {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row), row, true);
        this.range.clear();
        this.range.start = index;
    }
}
