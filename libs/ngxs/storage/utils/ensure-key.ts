import {PersistenceProvider} from '@angular-ru/ngxs/typings';

import {ensurePath} from './ensure-path';

export function ensureKey(provider: PersistenceProvider): string {
    return `${provider.prefixKey}${ensurePath(provider)}`;
}
