import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleFifteenComponent} from './sample-fifteen.component';

@NgModule({
    declarations: [SampleFifteenComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleFifteenComponent}]),
    ],
})
export class SampleFifteenModule {}
