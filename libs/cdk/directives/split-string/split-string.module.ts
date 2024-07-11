import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SplitStringDirective} from './split-string.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [SplitStringDirective],
    exports: [SplitStringDirective],
})
export class SplitStringModule {}
