# Angular Table Builder

[![npm version](https://badge.fury.io/js/%40angular-ru%2Fng-table-builder.svg)](https://badge.fury.io/js/%40angular-ru%2Fng-table-builder)
[![npm-stat](https://img.shields.io/npm/dt/@angular-ru/ng-table-builder.svg)](https://npm-stat.com/charts.html?package=@angular-ru/ng-table-builder&from=2017-01-12)

The Angular Table Builder includes a comprehensive set of ready-to-use features covering everything from paging,
sorting, filtering, editing, and grouping to row and column virtualization, and accessibility support.

Demo: https://angular-ru.github.io/angular-ru-ng-table-builder-example-app/

```bash
$ npm install --save @angular-ru/ng-table-builder
```

After a few seconds of waiting, you should be good to go. Let's get to the actual coding! As a first step, let's add the
Angular table builder module to our app module (src/app.module.ts):

```ts
import { TableBuilderModule } from '@angular-ru/ng-table-builder';

@NgModule({
    imports: [TableBuilderModule.forRoot() /*, ... */]
})
export class AppModule {}
```

### Simple use

Next, let's declare the basic grid configuration. Edit src/app.component.ts:

```ts
import { Component } from '@angular/core';
import { MyData } from './my-data.interface';

@Component({
    selector: 'app-root',
    template: ` <ngx-table-builder [source]="data"></ngx-table-builder> `
})
export class AppComponent {
    public data: MyData[] = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
}
```

see: https://stackblitz.com/edit/ng-table-builder-simple

The `ngx-table-builder` provides a styled data-table that can be used to display rows of data. The ngx-table-builder is
an customizable data-table with a fully-templated API, dynamic columns, and an accessible DOM structure. This component
acts as the core upon which anyone can build their own tailored data-table experience.

### Custom template

```ts
// app.component.ts
import { Component } from '@angular/core';
import { LicenseSample } from './license.interface';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
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
```

```html
<!-- app.component.html -->
<ngx-table-builder [source]="licenses">
    <ngx-column key="name">
        <ng-template ngx-th>License</ng-template>
        <ng-template ngx-td let-name>
            {{ name | uppercase }}
        </ng-template>
    </ngx-column>

    <ngx-column key="price">
        <ng-template ngx-th>Cost</ng-template>
        <ng-template ngx-td let-price>
            {{ price | currency }}
        </ng-template>
    </ngx-column>
</ngx-table-builder>
```

### TODO:

-   [x] Simple use and setup;
-   [x] Virtual scroll (horizontal, vertical);
-   [x] Auto calculate height;
-   [x] Customisable Appearance;
-   [x] State Persistence;
-   [x] Filtering;
-   [x] Resizing;
-   [x] Sorting;
-   [x] Selection;
-   [x] Context menu;
-   [ ] Outstanding Performance (need improved);
