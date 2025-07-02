import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
