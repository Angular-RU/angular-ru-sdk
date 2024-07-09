import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {GuideComponent} from './guide.component';

@NgModule({
    declarations: [GuideComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: GuideComponent}]),
    ],
})
export class GuideModule {}
