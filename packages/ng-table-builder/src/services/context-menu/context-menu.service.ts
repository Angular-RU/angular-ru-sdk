import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TableRow } from '../../interfaces/table-builder.external';
import { Any } from '../../interfaces/table-builder.internal';
import { getDeepValue } from '../../operators/deep-value';
import { ContextMenuState } from './context-menu.interface';

@Injectable()
export class ContextMenuService {
    public state: ContextMenuState = ({} as Any) as ContextMenuState;
    public readonly events: Subject<void> = new Subject();

    public openContextMenu(event: MouseEvent, key: string | null = null, row: TableRow | null = null): void {
        this.state = new ContextMenuState({
            key,
            item: row,
            opened: true,
            value: getDeepValue(row, key) || null,
            textContent: ((event.target || {}) as Node).textContent,
            position: { left: event.clientX, top: event.clientY }
        });

        this.events.next();
        event.stopPropagation();
        event.preventDefault();
    }

    public close(): void {
        this.state = new ContextMenuState();
        this.events.next();
    }
}
