import { ExcelBuilderModule } from '@angular-ru/ng-excel-builder';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, TranslateModule.forRoot(), ExcelBuilderModule]
})
export class AppModule {}
