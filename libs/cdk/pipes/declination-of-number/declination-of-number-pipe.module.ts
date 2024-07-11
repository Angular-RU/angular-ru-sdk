import {NgModule} from '@angular/core';

import {DeclinationOfNumberPipe} from './declination-of-number.pipe';

@NgModule({
    declarations: [DeclinationOfNumberPipe],
    providers: [DeclinationOfNumberPipe],
    exports: [DeclinationOfNumberPipe],
})
export class DeclinationOfNumberPipeModule {}
