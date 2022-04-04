import { isFalsy, isTruthy } from '@angular-ru/cdk/utils';
import { MigrateFn, NgxsDataMigrateStorage, RehydrateInfo, RehydrateInfoOptions } from '@angular-ru/ngxs/typings';
import { getValue, setValue } from '@ngxs/store';
import { PlainObject } from '@ngxs/store/internals';

import { ensurePath } from './ensure-path';

// eslint-disable-next-line max-lines-per-function
export function rehydrate<T>(params: RehydrateInfoOptions<T>): RehydrateInfo {
    let states: PlainObject = params.states;
    const { provider, data, info }: RehydrateInfoOptions<T> = params;

    if (isFalsy(provider.rehydrate)) {
        return { states, rehydrateIn: false };
    }

    const path: string = ensurePath(provider);
    const prevData: T = getValue(states, path);

    if (isTruthy(info.versionMismatch)) {
        const stateInstance: any = provider.stateInstance;
        const instance: NgxsDataMigrateStorage = stateInstance;
        const migrateFn: MigrateFn = provider.migrate ?? instance.ngxsDataStorageMigrate?.bind(provider.stateInstance);
        const newMigrationData: PlainObject = migrateFn?.(prevData, data);

        states = setValue(states, path, newMigrationData);

        return { states, rehydrateIn: true };
    } else if (JSON.stringify(prevData) !== JSON.stringify(data)) {
        states = setValue(states, path, data);

        return { states, rehydrateIn: true };
    }

    return { states, rehydrateIn: false };
}
