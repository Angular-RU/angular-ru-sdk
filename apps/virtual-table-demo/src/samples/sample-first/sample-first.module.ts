import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleFirstComponent} from './sample-first.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleFirstComponent}]),
    ],
    declarations: [SampleFirstComponent],
})
export class SampleFirstModule {}
