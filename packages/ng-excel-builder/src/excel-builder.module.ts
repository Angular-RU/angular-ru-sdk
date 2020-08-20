import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ExcelBuilderService } from './excel-builder.service';
import { ExcelService } from './excel.service';

@NgModule({
    imports: [TranslateModule.forRoot()],
    providers: [ExcelBuilderService, ExcelService, WebWorkerThreadService]
})
export class ExcelBuilderModule {}
