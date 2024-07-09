import {Nullable} from '@angular-ru/cdk/typings';

import {MousePosition} from '../../interfaces/table-builder.internal';

export class FilterStateEvent {
    public key: Nullable<string> = null;
    public opened: Nullable<boolean> = null;
    public position: MousePosition = {left: null, top: null};
}
