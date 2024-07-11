import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleSixteenComponent} from './sample-sixteen.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleSixteenComponent}]),
    ],
    declarations: [SampleSixteenComponent],
})
export class SampleSixteenModule {}
