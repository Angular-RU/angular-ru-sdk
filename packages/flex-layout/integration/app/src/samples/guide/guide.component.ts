import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent {}
