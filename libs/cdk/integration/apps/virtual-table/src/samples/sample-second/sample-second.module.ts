import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SampleSecondComponent } from './sample-second.component';

@NgModule({
    declarations: [SampleSecondComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleSecondComponent }])]
})
export class SampleSecondModule {}
