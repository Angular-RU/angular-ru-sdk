import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxsModule} from '@ngxs/store';

import {CountComponent} from './count.component';
import {CountState} from './count.state';
import {CountSubState} from './count-sub.state';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxsModule.forFeature([CountState, CountSubState]),
        RouterModule.forChild([{path: '', component: CountComponent}]),
    ],
    declarations: [CountComponent],
})
export class CountModule {}
