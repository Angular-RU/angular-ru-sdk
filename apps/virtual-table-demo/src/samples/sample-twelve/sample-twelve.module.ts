import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleTwelveComponent} from './sample-twelve.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleTwelveComponent}]),
    ],
    declarations: [SampleTwelveComponent],
})
export class SampleTwelveModule {}
