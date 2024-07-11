import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleElevenComponent} from './sample-eleven.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleElevenComponent}]),
    ],
    declarations: [SampleElevenComponent],
})
export class SampleElevenModule {}
