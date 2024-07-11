import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular-ru/cdk/flex-layout';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        HttpClientModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
