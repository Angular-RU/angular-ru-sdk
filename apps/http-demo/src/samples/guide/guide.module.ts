import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

import {GuideComponent} from './guide.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        ScrollingModule,
        RouterModule.forChild([
            {
                path: '',
                component: GuideComponent,
            },
        ]),
    ],
    declarations: [GuideComponent],
})
export class GuideModule {}
