import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {GuideComponent} from './guide.component';

@NgModule({
    declarations: [GuideComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: GuideComponent}]),
    ],
})
export class GuideModule {}
