import {NgModule} from '@angular/core';

import {TypeAsPipe} from './type-as.pipe';

@NgModule({
    exports: [TypeAsPipe],
    providers: [TypeAsPipe],
    declarations: [TypeAsPipe],
})
export class TypeAsPipeModule {}
