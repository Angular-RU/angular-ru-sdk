import {getStateMetadata} from '@angular-ru/ngxs/internals';
import {PersistenceProvider} from '@angular-ru/ngxs/typings';

export function ensurePath(provider: PersistenceProvider): string {
    return provider.path ?? getStateMetadata(provider.stateClassRef!).path!;
}
