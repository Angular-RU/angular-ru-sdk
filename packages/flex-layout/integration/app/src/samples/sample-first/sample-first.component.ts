import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    styleUrls: ['./sample-first.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstComponent {}
