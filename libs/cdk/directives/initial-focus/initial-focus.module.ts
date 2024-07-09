import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {InitialFocusDirective} from './initial-focus.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InitialFocusDirective],
    exports: [InitialFocusDirective],
})
export class InitialFocusModule {}
