import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataHttpClientModule} from '@angular-ru/cdk/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ApiClient} from './services/clients/api.client';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        DataHttpClientModule.forRoot([ApiClient], {
            hostUrl: 'https://jsonplaceholder.typicode.com',
            limitConcurrency: 5,
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
