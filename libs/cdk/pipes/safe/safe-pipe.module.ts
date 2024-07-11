import {NgModule} from '@angular/core';

import {SafePipe} from './safe.pipe';

@NgModule({declarations: [SafePipe], providers: [SafePipe], exports: [SafePipe]})
export class SafePipeModule {}
