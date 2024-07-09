import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ConvertCaseDirective} from './convert-case.directive';

@NgModule({
    declarations: [ConvertCaseDirective],
    imports: [CommonModule],
    exports: [ConvertCaseDirective],
})
export class ConvertCaseModule {}
