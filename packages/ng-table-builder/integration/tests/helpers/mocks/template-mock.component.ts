import { Component } from '@angular/core';

interface LicenseSample {
    id: number;
    name: string;
    price: number;
}

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'template-mock',
    // tslint:disable-next-line:component-max-inline-declarations
    template: `
        <!-- app.component.html -->
        <ngx-table-builder [source]="licenses">
            <ngx-column key="name">
                <ng-template ngx-th>License</ng-template>
                <ng-template ngx-td let-name>{{ name | uppercase }}</ng-template>
            </ngx-column>

            <ngx-column key="price">
                <ng-template ngx-th>Cost</ng-template>
                <ng-template ngx-td let-price>{{ price | currency }}</ng-template>
            </ngx-column>
        </ngx-table-builder>
    `
})
export class TemplateMockComponent {
    public licenses: LicenseSample[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199
        }
    ];
}
