import { Component } from '@angular/core';

import { TableRow } from '../../../../src/interfaces/table-builder.external';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'app',
    template: ` <ngx-table-builder [source]="data"></ngx-table-builder> `
})
export class SimpleMockComponent {
    public data: TableRow[] = [
        { id: 1, name: 'Max', lastName: 'Ivanov' },
        { id: 2, name: 'Ivan', lastName: 'Petrov' },
        { id: 3, name: 'Petr', lastName: 'Sidorov' }
    ];
}
