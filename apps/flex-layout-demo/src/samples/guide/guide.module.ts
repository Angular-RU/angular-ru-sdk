import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {GuideComponent} from './guide.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: GuideComponent}]),
    ],
    declarations: [GuideComponent],
})
export class GuideModule {}
