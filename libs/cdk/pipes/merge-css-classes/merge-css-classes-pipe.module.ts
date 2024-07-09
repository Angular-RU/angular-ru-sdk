import {NgModule} from '@angular/core';

import {MergeCssClassesPipe} from './merge-css-classes.pipe';

@NgModule({
    declarations: [MergeCssClassesPipe],
    exports: [MergeCssClassesPipe],
    providers: [MergeCssClassesPipe],
})
export class MergeCssClassesPipeModule {}
