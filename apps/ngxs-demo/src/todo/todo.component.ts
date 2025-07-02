import {ChangeDetectionStrategy, Component} from '@angular/core';

import {TodoState} from './todo.state';

@Component({
    standalone: false,
    selector: 'todo',
    templateUrl: './todo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
    constructor(public todo: TodoState) {}
}
