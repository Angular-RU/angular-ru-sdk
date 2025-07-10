import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'app',
    imports: [VirtualTable],
    template: `
        <ngx-table-builder [source]="data"></ngx-table-builder>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleMockComponent {
    public data: PlainObject[] = [
        {id: 1, name: 'Max', lastName: 'Ivanov'},
        {id: 2, name: 'Ivan', lastName: 'Petrov'},
        {id: 3, name: 'Petr', lastName: 'Sidorov'},
    ];
}
