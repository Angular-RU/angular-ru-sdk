import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleSeventeenComponent} from './sample-seventeen.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleSeventeenComponent}]),
    ],
    declarations: [SampleSeventeenComponent],
})
export class SampleSeventeenModule {}
