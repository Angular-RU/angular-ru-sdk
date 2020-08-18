import { getValueByPath } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TableRow } from '../../interfaces/table-builder.external';
import { ContextMenuState } from './context-menu.interface';

@Injectable()
export class ContextMenuService {
    public state: ContextMenuState = ({} as Any) as ContextMenuState;
    public readonly events: Subject<void> = new Subject();

    public openContextMenu(event: MouseEvent, key: string | null = null, row: TableRow | null = null): boolean {
        this.state = new ContextMenuState({
            key,
            item: row,
            opened: true,
            value: getValueByPath(row, key) || null,
            textContent: ((event.target || {}) as Node).textContent,
            position: { left: event.clientX, top: event.clientY }
        });

        this.events.next();
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    public close(): void {
        this.state = new ContextMenuState();
        this.events.next();
    }
}
