import {NgModule} from '@angular/core';

import {DefaultValuePipe} from './default-value.pipe';

@NgModule({
    declarations: [DefaultValuePipe],
    providers: [DefaultValuePipe],
    exports: [DefaultValuePipe],
})
export class DefaultValuePipeModule {}
