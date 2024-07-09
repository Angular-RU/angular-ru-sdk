import {NgModule} from '@angular/core';

import {CoerceBooleanPipe} from './coerce-boolean.pipe';

@NgModule({
    exports: [CoerceBooleanPipe],
    providers: [CoerceBooleanPipe],
    declarations: [CoerceBooleanPipe],
})
export class CoerceBooleanPipeModule {}
