import { Any } from '@angular-ru/common/typings';

import { MousePosition } from '../../interfaces/table-builder.internal';

export class ContextMenuState<T = Any, K = Any> {
    public position: MousePosition = { left: null, top: null };
    public opened: boolean = false;
    public key: string | null = null;
    public item: T | null = null;
    public value: K | null | undefined = null;
    public textContent: string | null = null;

    constructor(state: ContextMenuState<T, K> | null = null) {
        if (state) {
            this.opened = state.opened;
            this.position = state.position;
            this.key = state.key;
            this.item = state.item;
            this.value = state.value;
            this.textContent = state.textContent;
        }
    }
}
