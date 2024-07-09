import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DisableControlDirective} from './disable-control.directive';

@NgModule({
    declarations: [DisableControlDirective],
    imports: [CommonModule],
    exports: [DisableControlDirective],
})
export class DisableControlModule {}
