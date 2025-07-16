import {provideHttpClient} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import {provideLogger} from '@angular-ru/cdk/logger';
import {isTrue} from '@angular-ru/cdk/utils';

import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(),
        provideLogger(
            isTrue(environment.useConfig)
                ? {
                      useLevelGroup: true,
                      cssClassMap: {
                          bold: 'font-weight: bold',
                          'line-through': 'text-decoration: line-through',
                          'code-sandbox': `
                            color: #666;
                            background: #f4f4f4;
                            border-left: 3px solid #f36d33;
                            font-family: monospace;
                            font-size: 15px;`,
                      },
                  }
                : {},
        ),
    ],
};
