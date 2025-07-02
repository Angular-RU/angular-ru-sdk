import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {
    NGXS_DATA_STORAGE_CONTAINER,
    NGXS_DATA_STORAGE_EXTENSION,
} from '@angular-ru/ngxs/storage';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsModule} from '@ngxs/store';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([], {
            developmentMode: !environment.production,
        }),
        NgxsLoggerPluginModule.forRoot(),
        NgxsDataPluginModule.forRoot([
            NGXS_DATA_STORAGE_EXTENSION,
            NGXS_DATA_STORAGE_CONTAINER,
        ]),
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
