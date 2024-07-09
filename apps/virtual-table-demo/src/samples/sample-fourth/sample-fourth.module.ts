import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleFourthComponent} from './sample-fourth.component';

@NgModule({
    declarations: [SampleFourthComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleFourthComponent}]),
    ],
})
export class SampleFourthModule {}
