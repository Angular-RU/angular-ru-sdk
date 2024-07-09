import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SplitStringDirective} from './split-string.directive';

@NgModule({
    declarations: [SplitStringDirective],
    imports: [CommonModule],
    exports: [SplitStringDirective],
})
export class SplitStringModule {}
