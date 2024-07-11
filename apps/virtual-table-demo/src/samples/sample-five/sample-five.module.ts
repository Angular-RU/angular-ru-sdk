import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleFiveComponent} from './sample-five.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleFiveComponent}]),
    ],
    declarations: [SampleFiveComponent],
})
export class SampleFiveModule {}
