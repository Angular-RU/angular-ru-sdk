<p align="center">
  <img src="https://raw.githubusercontent.com/ngxs/store/master/docs/assets/logo.png">
  <br />
  <b>NGXS Persistence API (@anglar-ru/ngxs)</b> <br />
  <b>🚀 See it in action on <a href="https://stackblitz.com/edit/ngxs-example-counter-app?file=src/app/count.state.ts">Stackblitz</a></b>
  <br />
</p>

<p align="center">
  <a href="https://badge.fury.io/js/%40angular-ru%2Fngxs">
    <img src="https://badge.fury.io/js/%40angular-ru%2Fngxs.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40ngxs-labs%2Fdata&from=2019-09-01">
    <img src="https://img.shields.io/npm/dm/@angular-ru/ngxs" />
  </a>
</p>

---

## Introduction

NGXS Persistence API is an extension based the Repository Design Pattern that offers a gentle introduction to NGXS by
simplifying management of entities or plain data while reducing the amount of explicitness.

![](https://habrastorage.org/webt/jd/t4/wo/jdt4woihu-chhiwlqqd4eogpelu.png)

### Key Concepts

The main purpose of this extension is to provide the necessary layer of abstraction for states. Automates the creation
of actions, dispatchers, and selectors for each entity type.

Benefits:

-   Angular-way (`State as a Service`)
-   Snapshot's from state out-of-the-box (`@Computed()`)
-   Support debounce for throttling dispatch (`@Debounce()`)
-   Simple manipulation with data from states (`NgxsDataRepository<T>`)
-   Automatic type inference from selection data stream (`myState.state$`)
-   Immutable state context out-of-the-box (`NgxsImmutableDataRepository<T>`)
-   Entity adapter out-of-the-box (`NgxsDataEntityCollectionsRepository<V, K>`)
-   Simple API for testing states (`ngxsTestingPlatform([A], (store: Store, a: A) => {...})`)
-   Persistence state out-of-the-box in sessionStorage, localStorage, custom (`@Persistence()`)
-   Automatic action naming by service methods for improved debugging (`@DataAction(), @Payload(), @Named()`)

Minimal peer dependencies:

-   Require minimal `@ngxs/store v3.6.2`
-   Require minimal `TypeScript v3.7.2`

### Simple example

**Before**

`counter.state.ts`

```ts
import { State, Action, StateContext } from '@ngxs/store';

export class Increment {
    static readonly type = '[Counter] Increment';
}

export class Decrement {
    static readonly type = '[Counter] Decrement';
}

@State<number>({
    name: 'counter',
    defaults: 0
})
export class CounterState {
    @Action(Increment)
    increment(ctx: StateContext<number>) {
        ctx.setState(ctx.getState() + 1);
    }

    @Action(Decrement)
    decrement(ctx: StateContext<number>) {
        ctx.setState(ctx.getState() - 1);
    }
}
```

`app.component.ts`

```ts
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { CounterState, Increment, Decrement } from './counter.state';

@Component({
    selector: 'app-root',
    template: `
        <ng-container *ngIf="counter$ | async as counter">
            <h1>{{ counter }}</h1>
        </ng-container>

        <button (click)="increment()">Increment</button>
        <button (click)="decrement()">Decrement</button>
    `
})
export class AppComponent {
    @Select(CounterState) counter$: Observable<number>;
    constructor(private store: Store) {}

    increment() {
        this.store.dispatch(new Increment());
    }

    decrement() {
        this.store.dispatch(new Decrement());
    }
}
```

**After**

`counter.state.ts`

```ts
import { State } from '@ngxs/store';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';

@StateRepository()
@State<number>({
    name: 'counter',
    defaults: 0
})
@Injectable()
export class CounterState extends NgxsDataRepository<number> {
    @DataAction() increment() {
        this.ctx.setState((state) => ++state);
    }

    @DataAction() decrement() {
        this.ctx.setState((state) => --state);
    }
}
```

`app.component.ts`

```ts
import { Component } from '@angular/core';

import { CounterState } from './counter.state';

@Component({
    selector: 'app-root',
    template: `
        <h1>{{ counter.snapshot }}</h1>
        <button (click)="counter.increment()">Increment</button>
        <button (click)="counter.decrement()">Decrement</button>
    `
})
export class AppComponent {
    constructor(counter: CounterState) {}
}
```

## Table of contents:

-   [🚀 Quick Start](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/quick-start.md)
-   [📦 Advanced](#table-of-contents)

    -   [(@)StateRepository](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/state-repository.md)
    -   [(@)DataAction](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/data-action.md)
    -   [(@)Computed](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/computed.md)
    -   [(@)Persistence](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/persistence-state.md)
    -   [Entity state adapter](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/entity.md)
    -   [Unit Testing](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/testing.md)
    -   [Lifecycle](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/lifecycle.md)
    -   [Immutability](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/immutability.md)
    -   [Extension API](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/ngxs/docs/extension-api.md)
