import { isDevMode } from '@angular/core';
import { deepFreeze } from '@angular-ru/cdk/object';

import { NGXS_DATA_EXCEPTIONS } from '@angular-ru/ngxs/tokens';
import { StateContext } from '@ngxs/store';

export function ensureDataStateContext<U, T extends StateContext<U>>(context: T | null): T {
    if (!context) {
        throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
    }

    return {
        ...context,
        getState(): U {
            return isDevMode() ? deepFreeze(context.getState()) : context.getState();
        },
        setState(value: any): void {
            context.setState(value);
        },
        patchState(value: any): void {
            context.patchState(value);
        }
    };
}
