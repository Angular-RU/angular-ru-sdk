import {NgModule} from '@angular/core';

import {DefaultValuePipe} from './default-value.pipe';

@NgModule({
    exports: [DefaultValuePipe],
    providers: [DefaultValuePipe],
    declarations: [DefaultValuePipe],
})
export class DefaultValuePipeModule {}
