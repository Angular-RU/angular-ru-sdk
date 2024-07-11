import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleThirdComponent} from './sample-third.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleThirdComponent}]),
    ],
    declarations: [SampleThirdComponent],
})
export class SampleThirdModule {}
