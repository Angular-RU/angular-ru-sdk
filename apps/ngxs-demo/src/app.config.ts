import {provideHttpClient} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
    provideRouter,
    withComponentInputBinding,
    withHashLocation,
    withInMemoryScrolling,
    withRouterConfig,
} from '@angular/router';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {withNgxsDataStorage} from '@angular-ru/ngxs/storage';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {provideStore, withNgxsNoopExecutionStrategy} from '@ngxs/store';

import {environment} from '../environments/environment';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(
            routes,
            withRouterConfig({
                paramsInheritanceStrategy: 'always',
            }),
            withComponentInputBinding(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
            }),
            withHashLocation(),
        ),
        provideAnimationsAsync(),
        provideStore(
            [],
            {
                developmentMode: !environment.production,
            },
            withNgxsLoggerPlugin(),
            withNgxsNoopExecutionStrategy(),
        ),
        provideNgxsDataPlugin(withNgxsDataStorage()),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                subscriptSizing: 'dynamic',
                appearance: 'outline',
            },
        },
    ],
};
