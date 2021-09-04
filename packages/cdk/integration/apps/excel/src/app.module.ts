import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER, ExcelBuilderModule } from '@angular-ru/cdk/excel';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

// ts-prune-ignore-next
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', `.json`);
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        MatListModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: createTranslateLoader
            }
        }),
        RouterModule.forRoot([]),
        ExcelBuilderModule.forRoot()
    ],
    providers: [EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER]
})
export class AppModule {}
