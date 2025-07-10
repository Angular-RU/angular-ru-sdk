import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';

import {TodoState} from './todo.state';

@Component({
    selector: 'todo',
    imports: [AsyncPipe],
    templateUrl: './todo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
    constructor(public todo: TodoState) {}
}
