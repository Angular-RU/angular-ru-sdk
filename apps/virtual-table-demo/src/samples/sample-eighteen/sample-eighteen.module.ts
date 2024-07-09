import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleEighteenComponent} from './sample-eighteen.component';

@NgModule({
    declarations: [SampleEighteenComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleEighteenComponent}]),
    ],
})
export class SampleEighteenModule {}
