import {NgModule} from '@angular/core';

import {CoerceBooleanPipe} from './coerce-boolean.pipe';

@NgModule({
    declarations: [CoerceBooleanPipe],
    providers: [CoerceBooleanPipe],
    exports: [CoerceBooleanPipe],
})
export class CoerceBooleanPipeModule {}
