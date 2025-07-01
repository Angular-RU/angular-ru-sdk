import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {ContextMenuSampleComponent} from './context-menu-sample/context-menu-sample.component';
import {NotFoundComponent} from './not-found.component';
import {SampleFourteenComponent} from './sample-fourteen.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: SampleFourteenComponent,
            },
        ]),
    ],
    declarations: [
        ContextMenuSampleComponent,
        NotFoundComponent,
        SampleFourteenComponent,
    ],
})
export class SampleFourteenModule {}
