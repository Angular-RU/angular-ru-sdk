import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ConvertCaseDirective} from './convert-case.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ConvertCaseDirective],
    exports: [ConvertCaseDirective],
})
export class ConvertCaseModule {}
