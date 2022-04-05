import { NgZone } from '@angular/core';
import { PlainObject } from '@angular-ru/cdk/typings';

import { RowId } from '../../../virtual-table/src/interfaces/table-builder.internal';
import { SelectionMap } from '../../../virtual-table/src/services/selection/selection';
import { SelectionService } from '../../../virtual-table/src/services/selection/selection.service';

describe('[TEST]: Selection service', () => {
    // @ts-ignore
    let preventDefaultInvoked: number = 0;
    let listenKeydown: boolean = false;
    let listenKeyup: boolean = false;

    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular: (fn: any): any => fn()
    };

    const mockPreventDefault: Partial<MouseEvent> = {
        preventDefault: (): void => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            preventDefaultInvoked++;
        }
    };

    const data: PlainObject[] = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
    ];

    jest.spyOn(window, 'addEventListener').mockImplementation((...args: unknown[]): void => {
        if (args[0] === 'keydown') {
            listenKeydown = true;
        } else if (args[0] === 'keyup') {
            listenKeyup = true;
        }
    });

    jest.spyOn(window, 'removeEventListener').mockImplementation((...args: unknown[]): void => {
        if (args[0] === 'keydown') {
            listenKeydown = false;
        } else if (args[0] === 'keyup') {
            listenKeyup = false;
        }
    });

    let selection: SelectionService<PlainObject>;

    beforeEach(() => {
        selection = new SelectionService(mockNgZone as NgZone);
        selection.rows = data;
        selection.selectionModeIsEnabled = true;
    });

    it('should be correct exception', () => {
        let message: string | null = null;

        try {
            selection.selectRow(data[0], mockPreventDefault as MouseEvent);
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toContain(`Can't select item, make sure you pass the correct primary key`);
    });

    it('should be correct selection with shift key', (): void => {
        const lastIndex: number = 2;
        const firstIndex: number = 0;

        selection.primaryKey = 'position';
        selection.selectRow(data[lastIndex], {
            ...mockPreventDefault,
            shiftKey: true
        } as MouseEvent);

        expect(selection.selectionModel.entries).toEqual({});
        expect(selection.selectionModel.isAll).toBe(false);
        expect(selection.range).toEqual({ start: 2, end: null });
        expect(selection.range.selectedRange()).toBe(false);

        selection.selectRow(data[firstIndex], {
            ...mockPreventDefault,
            shiftKey: true
        } as MouseEvent);

        expect(selection.selectionModel.entries).toEqual({ 1: true, 2: true, 3: true });
        expect(selection.selectionModel.isAll).toBe(true);
        expect(selection.range).toEqual({ start: 0, end: 2 });
        expect(selection.range.selectedRange()).toBe(true);
    });

    it('should be correct selection with ctrl key', (): void => {
        const lastIndex: number = 2;
        const firstIndex: number = 0;

        selection.primaryKey = 'position';

        selection.selectRow(data[lastIndex], {
            ...mockPreventDefault,
            ctrlKey: true
        } as MouseEvent);

        expect(selection.selectionModel.entries).toEqual({ 3: true });
        expect(selection.selectionModel.isAll).toBe(false);
        expect(selection.range).toEqual({ start: 2, end: null });
        expect(selection.range.selectedRange()).toBe(false);

        selection.selectRow(data[firstIndex], {
            ...mockPreventDefault,
            ctrlKey: true
        } as MouseEvent);

        expect(selection.selectionModel.entries).toEqual({ 1: true, 3: true });
        expect(selection.selectionModel.isAll).toBe(false);
        expect(selection.range).toEqual({ start: 0, end: null });
        expect(selection.range.selectedRange()).toBe(false);
    });

    it('should be correct selection without keypress', () => {
        const lastIndex: number = 2;
        const firstIndex: number = 0;

        selection.primaryKey = 'position';

        selection.selectRow(data[lastIndex], mockPreventDefault as MouseEvent);

        expect(selection.selectionModel.entries).toEqual({ 3: true });
        expect(selection.selectionModel.isAll).toBe(false);
        expect(selection.range).toEqual({ start: 2, end: null });
        expect(selection.range.selectedRange()).toBe(false);

        selection.selectRow(data[firstIndex], mockPreventDefault as MouseEvent);

        expect(selection.selectionModel.entries).toEqual({ 1: true });
        expect(selection.selectionModel.isAll).toBe(false);
        expect(selection.range).toEqual({ start: 0, end: null });
        expect(selection.range.selectedRange()).toBe(false);
    });

    it('should be correct get Id by row', () => {
        selection.primaryKey = 'position';
        expect(selection.getIdByRow(data[0])).toBe(1);
    });

    it('should be correct remove listener before ngOnDestroy', () => {
        selection.listenShiftKey();
        expect(listenKeydown).toBe(true);
        expect(listenKeyup).toBe(true);
        selection.ngOnDestroy();
        expect(listenKeydown).toBe(false);
        expect(listenKeyup).toBe(false);
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
        expect(selection.selectionModel.isAll).toBe(false);

        selection.reset();
        expect(selection.selectionModel.entries).toEqual({});
        expect(selection.selectionModel.isAll).toBe(false);

        selection.toggleAll(data);
        expect(selection.selectionModel.entries).toEqual({ 1: true, 2: true, 3: true });
        expect(selection.selectionModel.isAll).toBe(true);

        selection.toggleAll(data);
        expect(selection.selectionModel.entries).toEqual({});
        expect(selection.selectionModel.isAll).toBe(false);
    });

    it('should be correct toggle', () => {
        const selectionMap: SelectionMap<PlainObject> = new SelectionMap();
        const id: RowId = 5;

        expect(selectionMap.hasValue()).toBe(false);
        selectionMap.select(id, {}, true);

        expect(selectionMap.hasValue()).toBe(true);

        selectionMap.toggle(id, {}, true);
        expect(selectionMap.entries).toEqual({});

        selectionMap.toggle(id, {}, true);
        expect(selectionMap.get(5)).toBe(true);
        expect(selectionMap.entries).toEqual({ 5: true });
    });
});
