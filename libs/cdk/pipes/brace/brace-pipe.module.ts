import {NgModule} from '@angular/core';

import {BracePipe} from './brace.pipe';

@NgModule({declarations: [BracePipe], providers: [BracePipe], exports: [BracePipe]})
export class BracePipeModule {}
