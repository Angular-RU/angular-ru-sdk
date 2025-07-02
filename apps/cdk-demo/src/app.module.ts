import {provideHttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AmountFormatModule} from '@angular-ru/cdk/directives';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        AmountFormatModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent],
})
export class AppModule {}
