import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExcelBuilderModule } from '@angular-ru/ng-excel-builder';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, TranslateModule.forRoot(), ExcelBuilderModule]
})
export class AppModule {}
