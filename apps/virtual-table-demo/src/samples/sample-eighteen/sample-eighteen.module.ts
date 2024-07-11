import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleEighteenComponent} from './sample-eighteen.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleEighteenComponent}]),
    ],
    declarations: [SampleEighteenComponent],
})
export class SampleEighteenModule {}
