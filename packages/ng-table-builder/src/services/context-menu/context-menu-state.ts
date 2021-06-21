import { Any, Nullable } from '@angular-ru/common/typings';

import { MousePosition } from '../../interfaces/table-builder.internal';

export class ContextMenuState<T = Any, K = Any> {
    public position: MousePosition = { left: null, top: null };
    public opened: boolean = false;
    public key: Nullable<string> = null;
    public item: Nullable<T> = null;
    public value: Nullable<K> = null;
    public textContent: Nullable<string> = null;

    constructor(state: Nullable<ContextMenuState<T, K>> = null) {
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
