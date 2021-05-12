import { Injectable } from '@angular/core';
import { getValueByPath } from '@angular-ru/common/object';
import { Subject } from 'rxjs';

import { ContextMenuState } from './context-menu-state';

@Injectable()
export class ContextMenuService<T, K = unknown> {
    public state: ContextMenuState<T, K> = new ContextMenuState<T, K>();
    public readonly events: Subject<void> = new Subject();

    public openContextMenu(event: MouseEvent, key: string | null = null, row: T | null = null): boolean {
        this.state = new ContextMenuState<T, K>({
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
        this.state = new ContextMenuState<T, K>();
        this.events.next();
    }
}
