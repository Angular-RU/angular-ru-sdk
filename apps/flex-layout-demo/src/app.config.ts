import {provideHttpClient} from '@angular/common/http';
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

import {routes} from './app.routes';

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
        provideHttpClient(),
        provideAnimationsAsync(),
    ],
};
