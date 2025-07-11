import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
    PreloadAllModules,
    provideRouter,
    withComponentInputBinding,
    withHashLocation,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
} from '@angular/router';
import {provideDataHttpClientOptions} from '@angular-ru/cdk/http';

import {routes} from './app.routes';
import {ApiClient} from './services/clients/api.client';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(
            routes,
            withPreloading(PreloadAllModules),
            withRouterConfig({
                paramsInheritanceStrategy: 'always',
            }),
            withComponentInputBinding(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
            }),
            withHashLocation(),
        ),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        provideDataHttpClientOptions([ApiClient], {
            hostUrl: 'https://jsonplaceholder.typicode.com',
            limitConcurrency: 5,
        }),
    ],
};
