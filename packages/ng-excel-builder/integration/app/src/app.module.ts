import { ExcelBuilderModule } from '@angular-ru/ng-excel-builder';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, ExcelBuilderModule]
})
export class AppModule {}
