import {AsyncPipe, JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CountState} from './count.state';
import {CountSubState} from './count-sub.state';

@Component({
    selector: 'count',
    imports: [AsyncPipe, FormsModule, JsonPipe],
    templateUrl: './count.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountComponent {
    constructor(
        public counter: CountState,
        public subCount: CountSubState,
    ) {}
}
