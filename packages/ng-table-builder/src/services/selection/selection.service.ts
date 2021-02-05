import { Injectable, isDevMode, NgZone, OnDestroy } from '@angular/core';
import { Fn, PlainObjectOf, PrimaryKey } from '@angular-ru/common/typings';
import { checkValueIsEmpty, isNil } from '@angular-ru/common/utils';
import { Subject } from 'rxjs';

import { ProduceDisableFn, TableRow } from '../../interfaces/table-builder.external';
import { KeyType, RowId, SelectionStatus } from '../../interfaces/table-builder.internal';
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
    public selectionModeIsEnabled: boolean = false;
    public originRows: TableRow[] | null = null;
    private readonly handler: PlainObjectOf<Fn> = {};

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
        this.originRows = null;
        this.unListenShiftKey();
    }

    public invalidate(): void {
        this.range.clear();
        this.selectionStart = { status: false };
        this.selectionModel.clear();
        this.onChanges.next();
    }

    public toggleAll(rows: TableRow[] | null): void {
        let selectedSize: number | null = null;
        window.clearInterval(this.selectionTaskIdle!);

        if (this.selectionModel.isAll) {
            this.selectionModel.clear();
        } else {
            rows?.forEach((row: TableRow): void => {
                const selected: boolean = this.selectionModel.select(this.getIdByRow(row), row, false);
                if (selected) {
                    selectedSize = (selectedSize ?? 0) + 1;
                }
            });
        }

        this.checkIsAllSelected(selectedSize);
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
        this.checkIsAllSelected();
    }

    public selectRow(row: TableRow, event: MouseEvent): void {
        const rows: TableRow[] = this.originRows ?? [];
        const { shiftKey, ctrlKey }: MouseEvent = event;
        const index: number = rows.findIndex(
            (item: TableRow): boolean => (item || {})[this.primaryKey] === (row || {})[this.primaryKey]
        );

        if (shiftKey) {
            this.multipleSelectByShiftKeydown(index);
        } else if (ctrlKey) {
            this.multipleSelectByCtrlKeydown(row, index);
        } else {
            this.singleSelect(row, index);
        }

        this.checkIsAllSelected();
    }

    public getIdByRow(row: TableRow): RowId {
        const id: RowId = (row || {})[this.primaryKey];

        if (checkValueIsEmpty(id) && isDevMode()) {
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

    private checkIsAllSelected(allSize: number | null = null): void {
        if (!this.selectionModeIsEnabled) {
            throw new Error('Please enable selection mode: <ngx-table-builder enable-selection />');
        }

        this.selectionModel.isAll = isNil(allSize)
            ? this.originRows?.length === this.selectionModel.size
            : allSize === this.selectionModel.size;

        this.selectionModel.generateImmutableEntries();
        this.onChanges.next();
    }

    private multipleSelectByShiftKeydown(index: number): void {
        const rows: TableRow[] = this.originRows ?? [];
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
