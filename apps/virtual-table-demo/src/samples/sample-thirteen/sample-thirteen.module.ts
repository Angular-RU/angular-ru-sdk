import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

import {SharedModule} from '../../shared/shared.module';
import {SampleThirteenComponent} from './sample-thirteen.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ToastrModule,
        RouterModule.forChild([{path: '', component: SampleThirteenComponent}]),
    ],
    declarations: [SampleThirteenComponent],
})
export class SampleThirteenModule {}
