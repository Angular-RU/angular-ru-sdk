import {NgModule} from '@angular/core';

import {DeclinationOfNumberPipe} from './declination-of-number.pipe';

@NgModule({
    exports: [DeclinationOfNumberPipe],
    providers: [DeclinationOfNumberPipe],
    declarations: [DeclinationOfNumberPipe],
})
export class DeclinationOfNumberPipeModule {}
