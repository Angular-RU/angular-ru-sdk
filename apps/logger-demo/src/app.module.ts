import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoggerModule} from '@angular-ru/cdk/logger';
import {isTrue} from '@angular-ru/cdk/utils';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';

@NgModule({
    imports: [
        LoggerModule.forRoot(
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
        BrowserModule,
        HttpClientModule,
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
