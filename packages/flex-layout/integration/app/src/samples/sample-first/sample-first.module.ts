import { FlexLayoutModule } from '@angular-ru/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleFirstComponent } from './sample-first.component';

@NgModule({
    declarations: [SampleFirstComponent],
    imports: [CommonModule, RouterModule.forChild([{ path: '', component: SampleFirstComponent }]), FlexLayoutModule]
})
export class SampleFirstModule {}
