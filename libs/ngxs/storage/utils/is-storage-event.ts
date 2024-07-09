import {NGXS_DATA_STORAGE_EVENT_TYPE} from '@angular-ru/ngxs/tokens';
import {ActionType} from '@ngxs/store';

export function isStorageEvent(action: ActionType): boolean {
    return action.type === NGXS_DATA_STORAGE_EVENT_TYPE;
}
