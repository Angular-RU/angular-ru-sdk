import {HttpClient, provideHttpClient} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';
import {
    provideExcelBuilder,
    provideExcelBuilderNgxTranslateFallback,
} from '@angular-ru/cdk/excel';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';

import {createTranslateLoader} from './create-translate-loader';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideExcelBuilder(),
        provideExcelBuilderNgxTranslateFallback(),
        provideAnimations(),
        provideTranslateService({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
            },
        }),
        provideRouter([]),
    ],
};
