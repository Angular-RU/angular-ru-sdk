import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexColumnDirective } from './flex-column.directive';
import { FlexContainerDirective } from './flex-container.directive';
import { FlexEndDirective } from './flex-end.directive';
import { FlexFullWidthDirective } from './flex-full-width.directive';
import { FlexInlineDirective } from './flex-inline.directive';
import { FlexItemDirective } from './flex-item.directive';
import { FlexJustifyNormalDirective } from './flex-justify-normal.directive';
import { FlexLayoutComponent } from './flex-layout.component';
import { FlexNoneDirective } from './flex-none.directive';
import { FlexSpaceBetweenDirective } from './flex-space-between.directive';
import { FlexStartDirective } from './flex-start.directive';

@NgModule({
    declarations: [
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
        FlexLayoutComponent
    ],
    exports: [
        FlexContainerDirective,
        FlexNoneDirective,
        FlexColumnDirective,
        FlexItemDirective,
        FlexEndDirective,
        FlexStartDirective,
        FlexInlineDirective,
        FlexFullWidthDirective,
        FlexJustifyNormalDirective,
        FlexSpaceBetweenDirective
    ],
    imports: [CommonModule]
})
export class FlexLayoutModule {}
