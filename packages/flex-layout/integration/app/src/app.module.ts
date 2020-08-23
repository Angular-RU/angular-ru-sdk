import { FlexLayoutModule } from '@angular-ru/flex-layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, FlexLayoutModule]
})
export class AppModule {}
