import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';

import {environment} from './environments/environment';
import {AppModule} from './src/app.module';

if (environment.production) {
    enableProdMode();
}

platformBrowser()
    .bootstrapModule(AppModule)
    .catch((error: unknown): void => console.error(error));
