#### `@angular-ru/cdk/date`

#### DateSuggestionModule

Module for convenient substitution of date intervals depending on values and the current date.

##### Default usage

Default implementation has 8 built-in strategies:

- `TODAY` — set at the beginning and end of the current day;
- `YESTERDAY` — set at the beginning and end of yesterday;
- `CALENDAR_WEEK` — set to the beginning of the calendar week and the end of the current day. Required to provide a
  DateAdapter;
- `LAST_3_DAYS`, `LAST_7_DAYS`, `LAST_60_DAYS` — set X last days;
- `FIRST_DAY_OF_INTERVAL` — set the beginning and end of the first day from the current interval;
- `LAST_180_DAYS_OF_INTERVAL` — set 180 days to the last day from the current interval.

```typescript
import {DateSuggestionModule, DateSuggestionComposer, DefaultDateIntervalSuggestion} from '@angular-ru/cdk/date';

@NgModule({
  // ...
  imports: [
    // ...
    DateSuggestionModule,
  ],
})
export class AppModule {}

@Component({
  // ...
  template: `
    <form [formGroup]="form">
      <!-- ... -->
    </form>
    <button
      *ngFor="let strategy of strategies"
      (click)="update(strategy)"
    >
      {{ strategy }}
    </button>
  `,
})
export class AppComponent {
  public form = new FormControl({
    from: new FormControl(/* ... */),
    to: new FormControl(/* ... */),
  });

  public strategies: DefaultDateIntervalSuggestion[] = this.composer.getSuggestions();

  constructor(private composer: DateSuggestionComposer<DefaultDateIntervalSuggestion>) {}

  public update(type: DefaultDateIntervalSuggestion): void {
    const descriptor = {dateFromKey: 'from', dateToKey: 'to'};
    this.composer.getStrategy(type).updateIntervalFor(form, descriptor);
  }
}
```

##### Advanced usage with custom strategies

You can implement your own strategies and combine them with the default strategies as needed.

```typescript
import {
  DAYS_COUNT,
  DEFAULT_SUGGESTION_STRATEGY_MAP,
  SuggestionStrategyMap,
  DateSuggestionModule,
  DateSuggestionComposer,
  DefaultDateIntervalSuggestion,
  endOfDay,
  shiftDate,
  startOfDay,
} from '@angular-ru/cdk/date';
import {DateIntervalDescriptor} from '@angular-ru/cdk/typings';

// Create your own strategies implementing DateSuggestionStrategy
@Injectable()
export class DaysAroundStartDateStrategy implements DateSuggestionStrategy {
  constructor(@Inject(DAYS_COUNT) private readonly daysCount: number) {}

  public updateIntervalFor(control: AbstractControl, {dateFromKey, dateToKey}: DateIntervalDescriptor): void {
    control.patchValue({
      [dateFromKey]: startOfDay(shiftDate({days: -this.daysCount}, control.value[dateFromKey])),
      [dateToKey]: endOfDay(shiftDate({days: this.daysCount}, control.value[dateFromKey])),
    });
  }
}

// Enumerate your custom strategies
export const enum SuggestionAddition {
  TWO_DAYS_AROUND_START = 'TWO_DAYS_AROUND_START',
}

// Merge enumeration of custom strategies with the default enumeration if required
export type ExtendedDateIntervalSuggestion = DefaultDateIntervalSuggestion | SuggestionAddition;

// Create a strategy map with the required parameters
const EXTENDED_STRATEGY_MAP: SuggestionStrategyMap<ExtendedDateIntervalSuggestion> = {
  ...DEFAULT_SUGGESTION_STRATEGY_MAP,
  [SuggestionAddition.TWO_DAYS_AROUND_START]: {
    strategy: DaysAroundStartDateStrategy,
    providers: [{provide: DAYS_COUNT, useValue: 2}],
  },
};

@NgModule({
  // ...
  imports: [
    // ...
    // Import DateSuggestionModule with created map as parameter
    DateSuggestionModule.forRoot(EXTENDED_STRATEGY_MAP),
  ],
})
export class AppModule {}

@Component({
  // ...
  template: `
    <form [formGroup]="form">
      <!-- ... -->
    </form>
    <button
      *ngFor="let strategy of strategies"
      (click)="update(strategy)"
    >
      {{ strategy }}
    </button>
  `,
})
export class AppComponent {
  public form = new FormControl({
    from: new FormControl(/* ... */),
    to: new FormControl(/* ... */),
  });

  public strategies: ExtendedDateIntervalSuggestion[] = this.composer.getSuggestions();

  // Inject DateSuggestionComposer with extended enumeration as generic parameter
  constructor(private composer: DateSuggestionComposer<ExtendedDateIntervalSuggestion>) {}

  public update(type: ExtendedDateIntervalSuggestion): void {
    const descriptor = {dateFromKey: 'from', dateToKey: 'to'};
    this.composer.getStrategy(type).updateIntervalFor(form, descriptor);
  }
}
```
