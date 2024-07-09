import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleTwelveComponent} from './sample-twelve.component';

@NgModule({
    declarations: [SampleTwelveComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleTwelveComponent}]),
    ],
})
export class SampleTwelveModule {}
