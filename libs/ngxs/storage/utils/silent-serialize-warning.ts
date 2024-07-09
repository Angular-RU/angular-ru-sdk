import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';

export function silentSerializeWarning(key: string, error: string): void {
    console.warn(
        `${NGXS_DATA_EXCEPTIONS.NGXS_PERSISTENCE_SERIALIZE} from metadata { key: '${key}' }. \nError serialize: ${error}`,
    );
}
