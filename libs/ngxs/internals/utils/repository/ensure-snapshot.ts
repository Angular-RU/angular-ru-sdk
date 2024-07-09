import {isDevMode} from '@angular/core';
import {deepFreeze} from '@angular-ru/cdk/object';

export function ensureSnapshot<T>(state: T): T {
    return isDevMode() ? deepFreeze(state) : state;
}
