import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstComponent {}
