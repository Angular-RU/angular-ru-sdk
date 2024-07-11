import {NgModule} from '@angular/core';

import {MergeCssClassesPipe} from './merge-css-classes.pipe';

@NgModule({
    declarations: [MergeCssClassesPipe],
    providers: [MergeCssClassesPipe],
    exports: [MergeCssClassesPipe],
})
export class MergeCssClassesPipeModule {}
