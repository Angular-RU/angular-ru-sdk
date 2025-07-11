import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';

import {PersonState} from './person.state';

@Component({
    selector: 'person',
    imports: [AsyncPipe],
    templateUrl: './person.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
    constructor(public person: PersonState) {}
}
