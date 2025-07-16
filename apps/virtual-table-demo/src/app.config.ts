import {provideHttpClient} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
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
import {provideVirtualTable} from '@angular-ru/cdk/virtual-table';
import {provideToastr} from 'ngx-toastr';

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
        provideVirtualTable(),
        provideToastr(),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                subscriptSizing: 'dynamic',
            },
        },
        provideNativeDateAdapter(),
    ],
};
