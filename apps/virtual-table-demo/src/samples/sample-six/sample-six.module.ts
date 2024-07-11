import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {SampleSixComponent} from './sample-six.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: SampleSixComponent}]),
    ],
    declarations: [SampleSixComponent],
})
export class SampleSixModule {}
