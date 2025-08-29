## @DataAction

`@DataAction()` - This decorator emulates the execution of asynchronous or synchronous actions. Actions can either be
thought of as a command which should trigger something to happen.

#### Before (origin NGXS behavior)

```typescript
export class AddTodo {
  public static type = '[Add todo]';
  constructor(public payload: string) {}
}

@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @Action(AddTodo)
  public add({setState}: StateContext<string[]>, {payload}: AddTodo): void {
    setState((state) => state.concat(payload));
  }
}
```

```typescript
@Component({
  selector: 'app',
  template: `
    <input #inputElement />
    <button (click)="addTodo(inputElement.value)">Add todo</button>
  `,
})
class AppComponent {
  constructor(private store: Store) {}

  public addTodo(value: string): void {
    this.store.dispatch(new AddTodo(value));
  }
}
```

#### After (Data-plugin behavior)

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public add(@Payload('todo') todo: string): void {
    this.ctx.setState((state) => state.concat(todo));
  }
}
```

```typescript
@Component({
  selector: 'app',
  template: `
    <input #inputElement />
    <button (click)="todo.add(inputElement.value)">Add todo</button>
  `,
})
class AppComponent {
  constructor(private todo: TodoState) {}
}
```

The method `todo.add(payload)` is the same as `store.dispatch({ type: '@todo.add', todo: payload })`.

Also you can invoke simple `setState` action:

```typescript
@Component({
  selector: 'app',
  template: `
    <input #inputElement />
    <button (click)="todo.setState(inputElement.value)">Add todo</button>
  `,
})
class AppComponent {
  constructor(private todo: TodoState) {}
}
```

The method `todo.setState(payload)` is the same as `store.dispatch({ type: '@todo.setState($arg0)', payload: todo })`.

What are the benefits?

- No need to create action classes
- Typing improvements for state context
- Explicit interaction with states

### Don't use nested actions

Bad

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public add(@Payload('todo') todo: string): void {
    // bad (action in action)
    this.setState((state) => state.concat(todo));
  }
}
```

Good

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public add(@Payload('todo') todo: string): void {
    this.ctx.setState((state) => state.concat(todo));
  }
}
```

---

Bad

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public add(@Payload('todo') todo: string): void {
    // bad (action in action)
    this.concat(todo);
  }

  @DataAction()
  private concat(@Payload('todo') todo: string): void {
    this.ctx.setState((state) => state.concat(todo));
  }
}
```

Good

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public add(@Payload('todo') todo: string): void {
    this.concat(todo);
  }

  private concat(todo: string): void {
    this.ctx.setState((state) => state.concat(todo));
  }
}
```

### What difference between `this.ctx.setState` and `this.setState`?

In order to understand the difference, you need to give some examples:

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {}

@Component({
  /* ... */
})
class TodoComponent {
  constructor(private todoState: TodoState) {}

  public addTodo(todo: string): void {
    this.todoState.setState(todo);
  }
}
```

_`setState`_ - this is a `public method` of the `NgxsDataRepository` class, it is annotated by the action decorator.
This means that when it is called, an action will be registered into `Store` and will be called dispatch from `Store`.
Thus you will see the state of the changed state through the logger or devtools plugins. When you call `setState` then
it calls the `ctx.setState` method from state context.

`State Context` provides a way to pass data through the global states tree without having to pass new state manually at
every level.

However, there is an unpleasant moment here, if you call the context directly, then you may not see anything in the
devtools, because the context will be called immediately without dispatching states:

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  public addTodo(todo: string): void {
    this.ctx.setState(todo);
  }
}

@Component({
  /* ... */
})
class TodoComponent {
  constructor(private todoState: TodoState) {}

  public addTodo(todo: string): void {
    // When you make a call, the state will be changed directly,
    // without notifying the NGXS lifecycle services
    // This is a bad approach!
    this.todoState.addTodo(todo);
  }
}
```

Therefore, the context should only be called inside the action.

```typescript
// GOOD

@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public addTodo(@Payload('todo') todo: string): void {
    // call context from under the action
    this.ctx.setState(todo);
  }
}

// GOOD

@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  public addTodo(@Payload('todo') todo: string): void {
    // call context inside another action
    this.setState(todo);
  }
}
```

However, there are very difficult situations in which you yourself need to determine which method should be an action
and which should not:

```typescript
@StateRepository()
@State<PersonModel>({
  name: 'person',
  defaults: {title: null, description: null},
})
@Injectable()
export class PersonState extends NgxsDataRepository<PersonModel> {
  constructor(private readonly personService: PersonService) {
    super();
  }

  @DataAction()
  public getContent(): Observable<PersonModel> {
    return this.personService.fetchAll().pipe(tap((content: PersonModel): void => this.ctx.setState(content)));
  }
}
```

In this situation, we have some problem:

```typescript
@Component({
  /* ... */
})
class PersonComponent implements OnInit {
  constructor(private personState: PersonState) {}

  public ngOnInit(): void {
    this.personState.getContent().subscribe(() => console.log('loaded'));
  }
}
```

Why didn’t we see anything? why didn’t we see a new state?

![](https://habrastorage.org/webt/cp/l9/vw/cpl9vwtazq2kmkms701ldo7gniy.png)

Everything is very simple, we made our method an action, this method is asynchronous and when the request ends, the
action ends. But then we manually change the state directly through the context, but the previous action has already
completed and we will not get the difference in states in the devtools.

We can try it differently:

```typescript
@StateRepository()
@State<PersonModel>({
  name: 'person',
  defaults: {title: null, description: null},
})
@Injectable()
export class PersonState extends NgxsDataRepository<PersonModel> {
  constructor(private readonly personService: PersonService) {
    super();
  }

  @DataAction()
  public getContent(): Observable<PersonModel> {
    return this.personService.fetchAll().pipe(
      tap((content: PersonModel): void => {
        // use setState instead ctx.setState
        this.setState(content);
      }),
    );
  }
}
```

![](https://habrastorage.org/webt/i8/s4/sc/i8s4sczamqjf8vckvmw_hf0ach4.png)

Now everything works, but in this case, we understand that the `getContent` method should be an ordinary method, not an
action, because during its execution the state does not change, the state changes only after the request is completed.
Therefore, it would be more correct to write such code:

```typescript
@StateRepository()
@State<PersonModel>({
  name: 'person',
  defaults: {title: null, description: null},
})
@Injectable()
export class PersonState extends NgxsDataRepository<PersonModel> {
  constructor(private readonly personService: PersonService) {
    super();
  }

  public getContent(): Observable<PersonModel> {
    return this.personService.fetchAll().pipe(
      tap((content: PersonModel): void => {
        this.setState(content);
      }),
    );
  }
}
```

![](https://habrastorage.org/webt/y8/e8/ii/y8e8iiiaehm4tgkujmq4dam98_c.png)

### `Payload`

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public addTodo(@Payload('todo') todo: string): void {
    if (todo) {
      this.ctx.setState((state: string[]) => state.concat(todo));
    }
  }
}
```

By default, all arguments have no name when automatically creating an action.

![](https://habrastorage.org/webt/dh/p4/9d/dhp49dtfspp6mas7-0em2vlqcra.png)

If during logging you want to see the payload, then you need to specify which action argument is this payload, using the
`@Payload()` decorator.

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public addTodo(@Payload('todo') todo: string): void {
    if (todo) {
      this.ctx.setState((state: string[]) => state.concat(todo));
    }
  }
}
```

![](https://habrastorage.org/webt/qf/ux/ag/qfuxagpzgabi4j8ptzk4ryeica8.png)

If you do not want to see the payload, but want to see the name of the arguments normally, you can use the `named`
decorator.

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public addTodo(@Named('x') todo: string): void {
    if (todo) {
      this.ctx.setState((state: string[]) => state.concat(todo));
    }
  }
}
```

![](https://habrastorage.org/webt/cs/1b/0j/cs1b0japo8b1sh7zvfjapfut_pm.png)

Decorators can be combined:

```typescript
@StateRepository()
@State<string[]>({
  name: 'todo',
  defaults: [],
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
  @DataAction()
  public addTodo(@Payload('TODO') @Named('x') todo: string): void {
    if (todo) {
      this.ctx.setState((state: string[]) => state.concat(todo));
    }
  }
}
```

![](https://habrastorage.org/webt/hz/3f/0l/hz3f0lmmptejx0fvjf1gxkvifwy.png)

### How to check whether the code is in `NgZone`?

The most common use of action is to optimize performance when starting a work consisting of one or more asynchronous or
synchronous tasks that don't require UI updates or error handling to be handled by Angular. Such tasks can be kicked off
via runOutsideAngular and if needed, these tasks can reenter the Angular zone via run.

By default, all action methods are called outside the Angular zone. But if you want to change this, you can define a
parameter `insideZone`:

```typescript
@StateRepository()
@State({
  name: 'counter',
  defaults: 0,
})
@Injectable()
class CounterState extends NgxsDataRepository<number> {
  @DataAction({insideZone: true})
  public incrementInZone(): void {
    console.log('expect is in Angular Zone', NgZone.isInAngularZone());
    this.ctx.setState((state) => ++state);
  }
}
```

### Use `@DataAction` without subscription

With Data-plugin in case, `@DataAction` returns an Observable, you have to subscribe to the `@DataAction` function to
fire an action itself. Without a subscribe, action will not be fired, and you will not see updates in the store. This
can be confusing and unexpected for developers that are used to pure NGXS. Also, it can provide issues while integrating
Data-plugin into the projects that were developed a long time without it.

To achieve an origin behavior of Actions you can pass option `subscribeRequired` with `false` value to the `@DataAction`
decorator.

```typescript
@StateRepository()
@State<PersonModel>({
  name: 'person',
  defaults: {title: null!, description: null!},
})
@Injectable()
export class PersonState extends NgxsImmutableDataRepository<PersonModel> {
  constructor(private readonly personService: PersonService) {
    super();
  }

  // Note: Also can be configured globally using provideNgxsDataPlugin({subscribeRequired: false})
  @DataAction({subscribeRequired: false})
  public getContent(): Observable<PersonModel> {
    return this.personService.fetchAll().pipe(tap((content: PersonModel): void => this.setState(content)));
  }
}
```

The same behavior can be achieved globally for all `@DataAction` in the app by providing a global config property.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(
      [],
      {
        developmentMode: !environment.production,
      },
      withNgxsLoggerPlugin(),
      withNgxsNoopExecutionStrategy(),
    ),
    provideNgxsDataPlugin({dataActionSubscribeRequired: false}, withNgxsDataStorage()),
  ],
};
```
