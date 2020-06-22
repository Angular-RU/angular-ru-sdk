/* eslint-disable */
import { NgZone } from '@angular/core';

import { TableRow } from '../../../src/interfaces/table-builder.external';
import { Any, RowId } from '../../../src/interfaces/table-builder.internal';
import { SelectionMap } from '../../../src/services/selection/selection';
import { SelectionService } from '../../../src/services/selection/selection.service';

describe('[TEST]: Selection service', () => {
    // @ts-ignore
    let preventDefaultInvoked: number = 0;
    let listenKeydown: boolean = false;
    let listenKeyup: boolean = false;

    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular: (fn: Any): Any => fn()
    };

    const mockPreventDefault: Partial<MouseEvent> = {
        preventDefault: (): void => {
            preventDefaultInvoked++;
        }
    };

    const data: TableRow[] = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
    ];

    (window as Any).addEventListener = jest.fn((type: string): void => {
        if (type === 'keydown') {
            listenKeydown = true;
        } else if (type === 'keyup') {
            listenKeyup = true;
        }
    });

    (window as Any).removeEventListener = jest.fn((type: string): void => {
        if (type === 'keydown') {
            listenKeydown = false;
        } else if (type === 'keyup') {
            listenKeyup = false;
        }
    });

    let selection: SelectionService;

    beforeEach(() => {
        selection = new SelectionService(mockNgZone as NgZone);
    });

    it('should be correct exception', () => {
        try {
            selection.selectRow(data[0], mockPreventDefault as MouseEvent, data);
        } catch (e) {
            expect(e.message).toContain(`Can't select item, make sure you pass the correct primary key`);
        }
    });

    it('should be correct selection with shift key', (): void => {
        const lastIndex: number = 2;
        const firstIndex: number = 0;

        selection.primaryKey = 'position';
        selection.selectRow(
            data[lastIndex],
            {
                ...mockPreventDefault,
                shiftKey: true
            } as MouseEvent,
            data
        );

        expect(selection.selectionModel.entries).toEqual({});
        expect(selection.selectionModel.isAll).toEqual(false);
        expect(selection.range).toEqual({ start: 2, end: null });
        expect(selection.range.selectedRange()).toEqual(false);

        selection.selectRow(
            data[firstIndex],
            {
                ...mockPreventDefault,
                shiftKey: true
            } as MouseEvent,
            data
        );

        expect(selection.selectionModel.entries).toEqual({ 1: true, 2: true, 3: true });
        expect(selection.selectionModel.isAll).toEqual(true);
        expect(selection.range).toEqual({ start: 0, end: 2 });
        expect(selection.range.selectedRange()).toEqual(true);
    });

    it('should be correct selection with ctrl key', (): void => {
        const lastIndex: number = 2;
        const firstIndex: number = 0;

        selection.primaryKey = 'position';

        selection.selectRow(
            data[lastIndex],
            {
                ...mockPreventDefault,
                ctrlKey: true
            } as MouseEvent,
            data
        );

        expect(selection.selectionModel.entries).toEqual({ 3: true });
        expect(selection.selectionModel.isAll).toEqual(false);
        expect(selection.range).toEqual({ start: 2, end: null });
        expect(selection.range.selectedRange()).toEqual(false);

        selection.selectRow(
            data[firstIndex],
            {
                ...mockPreventDefault,
                ctrlKey: true
            } as MouseEvent,
            data
        );

        expect(selection.selectionModel.entries).toEqual({ 1: true, 3: true });
        expect(selection.selectionModel.isAll).toEqual(false);
        expect(selection.range).toEqual({ start: 0, end: null });
        expect(selection.range.selectedRange()).toEqual(false);
    });

    it('should be correct selection without keypress', () => {
        const lastIndex: number = 2;
        const firstIndex: number = 0;

        selection.primaryKey = 'position';

        selection.selectRow(data[lastIndex], mockPreventDefault as MouseEvent, data);

        expect(selection.selectionModel.entries).toEqual({ 3: true });
        expect(selection.selectionModel.isAll).toEqual(false);
        expect(selection.range).toEqual({ start: 2, end: null });
        expect(selection.range.selectedRange()).toEqual(false);

        selection.selectRow(data[firstIndex], mockPreventDefault as MouseEvent, data);

        expect(selection.selectionModel.entries).toEqual({ 1: true });
        expect(selection.selectionModel.isAll).toEqual(false);
        expect(selection.range).toEqual({ start: 0, end: null });
        expect(selection.range.selectedRange()).toEqual(false);
    });

    it('should be correct get Id by row', () => {
        selection.primaryKey = 'position';
        expect(selection.getIdByRow(data[0])).toEqual(1);
    });

    it('should be correct remove listener before ngOnDestroy', () => {
        selection.listenShiftKey();
        expect(listenKeydown).toEqual(true);
        expect(listenKeyup).toEqual(true);
        selection.ngOnDestroy();
        expect(listenKeydown).toEqual(false);
        expect(listenKeyup).toEqual(false);
    });

    it('should be correct change selection start', () => {
        expect(selection.selectionStart).toEqual({ status: false });
        selection.shiftKeyDetectSelection({ shiftKey: true } as KeyboardEvent);
        expect(selection.selectionStart).toEqual({ status: true });
    });

    it('should be correct toggle rows', () => {
        selection.primaryKey = 'position';

        selection.toggle(data[0]);
        expect(selection.selectionModel.entries).toEqual({ 1: true });
        expect(selection.selectionModel.isAll).toEqual(false);

        selection.reset();
        expect(selection.selectionModel.entries).toEqual({});
        expect(selection.selectionModel.isAll).toEqual(false);

        selection.toggleAll(data);
        expect(selection.selectionModel.entries).toEqual({ 1: true, 2: true, 3: true });
        expect(selection.selectionModel.isAll).toEqual(true);

        selection.toggleAll(data);
        expect(selection.selectionModel.entries).toEqual({});
        expect(selection.selectionModel.isAll).toEqual(false);
    });

    it('should be correct toggle', () => {
        const selectionMap: SelectionMap = new SelectionMap();
        const id: RowId = 5;

        expect(selectionMap.hasValue()).toEqual(false);
        selectionMap.select(id, {}, true);

        expect(selectionMap.hasValue()).toEqual(true);

        selectionMap.toggle(id, {}, true);
        expect(selectionMap.entries).toEqual({});

        selectionMap.toggle(id, {}, true);
        expect(selectionMap.get(5)).toEqual(true);
        expect(selectionMap.entries).toEqual({ 5: true });
    });
});
