import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DisableControlDirective} from './disable-control.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [DisableControlDirective],
    exports: [DisableControlDirective],
})
export class DisableControlModule {}
