import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleEightComponent} from './sample-eight.component';

@NgModule({
    declarations: [SampleEightComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleEightComponent}]),
    ],
})
export class SampleEightModule {}
