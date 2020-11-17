import { NgModule } from '@angular/core';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { TranslateModule } from '@ngx-translate/core';

import { ExcelService } from './excel.service';
import { ExcelBuilderService } from './excel-builder.service';

@NgModule({
    imports: [TranslateModule],
    providers: [ExcelBuilderService, ExcelService, WebWorkerThreadService]
})
export class ExcelBuilderModule {}
