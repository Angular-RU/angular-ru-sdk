import {ApplicationRef, makeEnvironmentProviders, Type} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {withNgxsDataStorage} from '@angular-ru/ngxs/storage';
import {provideStore} from '@ngxs/store';
import {ɵStateClass as StateClass} from '@ngxs/store/internals';

import {createInternalNgxsRootElement} from './internal/create-internal-ngxs-root-element';
import {NgxsAppMockComponent} from './ngxs-app-mock.component';

export function provideNgxsDataTesting(states: StateClass[] = []) {
    return makeEnvironmentProviders([
        provideStore(states, {
            developmentMode: true,
            selectorOptions: {suppressErrors: false},
        }),
        provideNgxsDataPlugin(withNgxsDataStorage()),
    ]);
}

export function ngxsInitTestingPlatform(
    appMockComponent: Type<any> = NgxsAppMockComponent,
): void {
    createInternalNgxsRootElement();

    const app = TestBed.inject(ApplicationRef);

    app.bootstrap(appMockComponent);
}
