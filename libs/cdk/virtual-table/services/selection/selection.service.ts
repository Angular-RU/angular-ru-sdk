import {Injectable, NgZone, OnDestroy} from '@angular/core';
import {Fn, Nullable, PlainObjectOf, PrimaryKey} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty, isMacOS, isNil} from '@angular-ru/cdk/utils';
import {Subject} from 'rxjs';

import {ProduceDisableFn} from '../../interfaces/table-builder.external';
import {KeyType, RowId, SelectionStatus} from '../../interfaces/table-builder.internal';
import {SelectionMap} from './selection';
import {SelectionRange} from './selection-range';

@Injectable()
export class SelectionService<T> implements OnDestroy {
    private readonly handler: PlainObjectOf<Fn> = {};
    public selectionModel = new SelectionMap<T>();
    public range: SelectionRange = new SelectionRange();
    public selectionStart: SelectionStatus = {status: false};
    public primaryKey: string = PrimaryKey.ID;
    public selectionTaskIdle: Nullable<number> = null;
    public onChanges$: Subject<void> = new Subject<void>();
    public selectionModeIsEnabled = false;
    public rows: Nullable<T[]> = null;

    constructor(private readonly ngZone: NgZone) {}

    public listenShiftKey(): void {
        this.listenShiftKeyByType(KeyType.KEYDOWN);
        this.listenShiftKeyByType(KeyType.KEYUP);
    }

    public unListenShiftKey(): void {
        this.removeListenerByType(KeyType.KEYDOWN);
        this.removeListenerByType(KeyType.KEYUP);
    }

    public setProducerDisableFn(producer: ProduceDisableFn<T>): void {
        this.selectionModel.produceDisableFn = producer;
    }

    public ngOnDestroy(): void {
        this.rows = null;
        this.unListenShiftKey();
    }

    public invalidate(): void {
        this.range.clear();
        this.selectionStart = {status: false};
        this.selectionModel.clear();
        this.onChanges$.next();
    }

    // eslint-disable-next-line complexity
    public toggleAll(rows: Nullable<T[]>): void {
        let selectedSize: Nullable<number> = null;

        window.clearInterval(this.selectionTaskIdle ?? 0);

        if (this.selectionModel.isAll) {
            this.selectionModel.clear();
        } else {
            for (const row of rows ?? []) {
                const selected: boolean = this.selectionModel.select(
                    this.getIdByRow(row),
                    row,
                    false,
                );

                if (selected) {
                    selectedSize = (selectedSize ?? 0) + 1;
                }
            }
        }

        this.checkIsAllSelected(selectedSize);
    }

    public reset(): void {
        this.selectionModel.clear();
        this.range.clear();
        this.onChanges$.next();
    }

    public toggle(row?: Nullable<T>): void {
        if (isNil(row)) {
            return;
        }

        this.ngZone.runOutsideAngular((): void =>
            window.clearInterval(this.selectionTaskIdle ?? 0),
        );
        this.selectionModel.toggle(this.getIdByRow(row), row, true);
        this.onChanges$.next();
        this.checkIsAllSelected();
    }

    public selectRow(row: Nullable<T>, event: MouseEvent): void {
        if (isNil(row)) {
            return;
        }

        const rows: T[] = this.rows ?? [];
        const {shiftKey, ctrlKey, metaKey}: MouseEvent = event;
        const index: number = rows.findIndex(
            (item: T): boolean =>
                ((item as any) ?? ({} as T))[this.primaryKey] ===
                row?.[this.primaryKey as keyof T],
        );

        if (shiftKey) {
            this.multipleSelectByShiftKeydown(index);
        } else if (isMacOS() ? metaKey : ctrlKey) {
            this.multipleSelectByCtrlKeydown(row, index);
        } else {
            this.singleSelect(row, index);
        }

        this.checkIsAllSelected();
    }

    public getIdByRow(row?: Nullable<T>): RowId {
        const id: RowId = (row as any)?.[this.primaryKey];

        if (checkValueIsEmpty(id)) {
            throw new Error(
                `Can't select item, make sure you pass the correct primary key, or you forgot enable selection
                <ngx-table-builder enable-selection primary-key="fieldId" />
                `,
            );
        }

        return id;
    }

    public shiftKeyDetectSelection({shiftKey}: KeyboardEvent): void {
        this.selectionStart = {status: shiftKey};
    }

    private listenShiftKeyByType(type: KeyType): void {
        this.ngZone.runOutsideAngular((): void => {
            this.handler[type] = ({shiftKey}: KeyboardEvent): void => {
                this.selectionStart = {status: shiftKey};
            };

            if (this.handler[type]) {
                window.addEventListener(type, this.handler[type], true);
            }
        });
    }

    private removeListenerByType(type: string): void {
        if (this.handler[type]) {
            window.removeEventListener(type, this.handler[type], true);
        }
    }

    private checkIsAllSelected(allSize: Nullable<number> = null): void {
        if (!this.selectionModeIsEnabled) {
            throw new Error(
                'Please enable selection mode: <ngx-table-builder enable-selection />',
            );
        }

        this.selectionModel.isAll = isNil(allSize)
            ? this.rows?.length === this.selectionModel.size
            : allSize === this.selectionModel.size;

        this.selectionModel.generateImmutableEntries();
        this.onChanges$.next();
    }

    private multipleSelectByShiftKeydown(index: number): void {
        const rows: T[] = this.rows ?? [];

        this.selectionModel.clear();
        this.range.put(index);
        const selectedRange: boolean = this.range.selectedRange();

        if (selectedRange) {
            const {start, end}: SelectionRange = this.range.sortKeys();

            for (let i: number = start!; i <= end!; ++i) {
                const row: T = rows[i];
                const rowId: RowId = this.getIdByRow(row);

                this.selectionModel.select(rowId, row, false);
            }
        }
    }

    private multipleSelectByCtrlKeydown(row: T, index: number): void {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row), row, true);
    }

    private singleSelect(row: T, index: number): void {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row), row, true);
        this.range.clear();
        this.range.start = index;
    }
}
