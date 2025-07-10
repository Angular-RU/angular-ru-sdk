import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './src/app.component';
import {appConfig} from './src/app.config';

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) =>
    console.error(error),
);
