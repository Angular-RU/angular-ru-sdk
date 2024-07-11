import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular-ru/cdk/flex-layout';

import {SampleFirstComponent} from './sample-first.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: SampleFirstComponent,
            },
        ]),
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
    ],
    declarations: [SampleFirstComponent],
})
export class SampleFirstModule {}
