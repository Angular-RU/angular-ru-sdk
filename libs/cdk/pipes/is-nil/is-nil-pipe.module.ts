import {NgModule} from '@angular/core';

import {IsNilPipe} from './is-nil.pipe';

@NgModule({declarations: [IsNilPipe], providers: [IsNilPipe], exports: [IsNilPipe]})
export class IsNilPipeModule {}
