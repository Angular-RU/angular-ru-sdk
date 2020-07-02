import { ExcelBuilderModule } from '@angular-ru/ng-excel-builder';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, ExcelBuilderModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
