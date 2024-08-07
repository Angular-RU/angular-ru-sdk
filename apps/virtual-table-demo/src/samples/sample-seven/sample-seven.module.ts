import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleSevenComponent} from './sample-seven.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleSevenComponent}]),
    ],
    declarations: [SampleSevenComponent],
})
export class SampleSevenModule {}
