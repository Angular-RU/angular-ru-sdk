import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SampleFourteenComponent } from './sample-fourteen.component';

@NgModule({
    declarations: [SampleFourteenComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleFourteenComponent }])]
})
export class SampleFourteenModule {}
