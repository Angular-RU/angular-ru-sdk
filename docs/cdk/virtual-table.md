# Angular Table Builder

The Angular Table Builder includes a comprehensive set of ready-to-use features covering everything from paging,
sorting, filtering, editing, and grouping to row and column virtualization, and accessibility support.

[**Demo**](https://angular-ru.github.io/angular-ru-ng-table-builder-example-app)

```bash
$ npm install --save @angular-ru/cdk
```

After a few seconds of waiting, you should be good to go. Let's get to the actual coding! As a first step, let's add the
virtual table provider to our app config (src/app.config.ts):

```typescript
import {provideVirtualTable} from '@angular-ru/cdk/virtual-table';

export const appConfig: ApplicationConfig = {
  providers: [provideVirtualTable()],
};
```

### Simple use

Next, let's declare the basic grid configuration. Edit src/app.component.ts:

```typescript
import {Component} from '@angular/core';
import {MyData} from './my-data.interface';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

@Component({
  selector: 'app-root',
  imports: [VirtualTable],
  template: `
    <ngx-table-builder [source]="data"></ngx-table-builder>
  `,
})
export class AppComponent {
  public data: MyData[] = [
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000},
  ];
}
```

see: https://stackblitz.com/edit/ng-table-builder-simple

The `ngx-table-builder` provides a styled data-table that can be used to display rows of data. The ngx-table-builder is
an customizable data-table with a fully-templated API, dynamic columns, and an accessible DOM structure. This component
acts as the core upon which anyone can build their own tailored data-table experience.

### Custom template

```typescript
// app.component.ts
import {Component} from '@angular/core';
import {LicenseSample} from './license.interface';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

@Component({
  selector: 'app',
  imports: [VirtualTable],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public licenses: LicenseSample[] = [
    {
      id: 1,
      name: 'single',
      price: 29.3,
    },
    {
      id: 2,
      name: 'developer',
      price: 49.8,
    },
    {
      id: 3,
      name: 'premium',
      price: 99.5,
    },
    {
      id: 4,
      name: 'enterprise',
      price: 199,
    },
  ];
}
```

```html
<!-- app.component.html -->
<ngx-table-builder [source]="licenses">
  <ngx-column key="name">
    <ng-template ngx-th>License</ng-template>
    <ng-template
      ngx-td
      let-name
    >
      {{ name | uppercase }}
    </ng-template>
  </ngx-column>

  <ngx-column key="price">
    <ng-template ngx-th>Cost</ng-template>
    <ng-template
      ngx-td
      let-price
    >
      {{ price | currency }}
    </ng-template>
  </ngx-column>
</ngx-table-builder>
```

### Filtering

```typescript
// app.component.ts
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {LicenseSample} from './license.interface';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

@Component({
  selector: 'app',
  imports: [VirtualTable],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('table') table;

  public licenses: LicenseSample[] = [
    {
      id: 1,
      name: 'single111',
      price: 29.3,
    },
    {
      id: 2,
      name: 'developer123',
      price: 49.8,
    },
    {
      id: 3,
      name: 'beginner211',
      price: 99.5,
    },
    {
      id: 4,
      name: 'enterprise321',
      price: 199,
    },
  ];

  ngAfterViewInit() {
    this.table.filterable.updateFilterTypeBy(TableFilterType.CONTAINS, 'er');
    this.table.filterable.updateFilterValueBy('11', 'name');
  }
}
```

```html
<!-- app.component.html -->
<ngx-table-builder
  #table
  enable-filtering
  [source]="licenses"
>
  <ngx-column
    key="name"
    is-filterable
  >
    <ng-template ngx-th>License</ng-template>
    <ng-template
      ngx-td
      let-name
    >
      {{ name | uppercase }}
    </ng-template>
  </ngx-column>

  <ngx-column
    key="price"
    is-filterable
  >
    <ng-template ngx-th>Cost</ng-template>
    <ng-template
      ngx-td
      let-price
    >
      {{ price | currency }}
    </ng-template>
  </ngx-column>
</ngx-table-builder>
```

Filtration:

```typescript
this.table.filterable.updateFilterTypeBy(TableFilterType.CONTAINS, 'name');
this.table.filterable.updateFilterValueBy('11', 'name');
```

Actions above filter the table and leave us with:

```
        {
            id: 1,
            name: 'single111',
            price: 29.3
        },
        {
            id: 3,
            name: 'beginner211',
            price: 99.5
        }
```

This example use filter table type _CONTAINS_. For other available types check _TableFilterType_

_is-filterable_ input set to _true_ also adds filer symbol to column, a click on it leads to open a filter which you can
provide like this:

```html
<ngx-table-builder>
  ...
  <ngx-filter>
    <your-custom-filter></your-custom-filter>
  </ngx-filter>
  ...
</ngx-table-builder>
```

#### External filtering

If leave _enable-filtering_ to be set _false_ and set _is-filterable_ to _true_ it will allow using default filters but
table builder will not filter source by its own rules, so you can handle it on your own

### TODO:

- [x] Simple use and setup;
- [x] Virtual scroll (horizontal, vertical);
- [x] Auto calculate height;
- [x] Customisable Appearance;
- [x] State Persistence;
- [x] Filtering;
- [x] Resizing;
- [x] Sorting;
- [x] Selection;
- [x] Context menu;
