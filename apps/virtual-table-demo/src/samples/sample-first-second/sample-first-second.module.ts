import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleFirstSecondComponent} from './sample-first-second.component';

@NgModule({
    declarations: [SampleFirstSecondComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleFirstSecondComponent}]),
    ],
})
export class SampleFirstSecondModule {}
