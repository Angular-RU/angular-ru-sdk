import {NgModule, Type} from '@angular/core';

import {FlexBottomIndentDirective} from './directives/flex-bottom-indent.directive';
import {FlexColumnDirective} from './directives/flex-column.directive';
import {FlexContainerDirective} from './directives/flex-container.directive';
import {FlexEndDirective} from './directives/flex-end.directive';
import {FlexFullWidthDirective} from './directives/flex-full-width.directive';
import {FlexInlineDirective} from './directives/flex-inline.directive';
import {FlexItemDirective} from './directives/flex-item.directive';
import {FlexJustifyNormalDirective} from './directives/flex-justify-normal.directive';
import {FlexNoneDirective} from './directives/flex-none.directive';
import {FlexSpaceBetweenDirective} from './directives/flex-space-between.directive';
import {FlexStartDirective} from './directives/flex-start.directive';

const DECLARATIONS: Type<unknown>[] = [
    FlexContainerDirective,
    FlexNoneDirective,
    FlexColumnDirective,
    FlexItemDirective,
    FlexEndDirective,
    FlexStartDirective,
    FlexInlineDirective,
    FlexFullWidthDirective,
    FlexJustifyNormalDirective,
    FlexSpaceBetweenDirective,
    FlexBottomIndentDirective,
];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class FlexLayoutModule {}
