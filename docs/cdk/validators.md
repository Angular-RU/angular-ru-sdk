#### `@angular-ru/cdk/validators`

- `emptyValidator`

```typescript
import {emptyValidator} from '@angular-ru/cdk/validators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Component} from '@angular/core';

@Component()
export class AppComponent {
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: '',
        lastName: '',
      },
      {validators: emptyValidator},
    );
  }
}
```

- `maxDateValidator, minDateValidator`

```typescript
import {maxDateValidator, maxDateValidator} from '@angular-ru/cdk/validators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Component} from '@angular/core';

@Component()
export class AppComponent {
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = new FormControl(toUtc({month: new Date().getMonth() - 4}), [
      // toUtc({ month: new Date().getMonth() - 3 }) generates a Timestamp equals to 3 months ago
      minDateValidator(toUtc({month: new Date().getMonth() - 3})),
      maxDateValidator(toUtc({month: new Date().getMonth() - 1})),
    ]);
  }
}
```

- `dateMaxIntervalValidator, dateMinIntervalValidator, orderedIntervalValidator`

```typescript
import {dateMaxIntervalValidator, dateMinIntervalValidator, orderedIntervalValidator} from '@angular-ru/cdk/validators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Component} from '@angular/core';

@Component()
export class AppComponent {
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = new FormGroup(
      {
        dateFrom: new FormControl(toUtc({month: new Date().getMonth() - 1})),
        dateTo: new FormControl(toUtc()),
      },
      [
        // new Date(0).setDate(40) generates 40-days time interval (in Timestamp)
        dateMinIntervalValidator(new Date(0).setDate(40), {dateToKey: 'dateTo', dateFromKey: 'dateFrom'}),
        dateMaxIntervalValidator(new Date(0).setDate(70), {dateToKey: 'dateTo', dateFromKey: 'dateFrom'}),
        orderedIntervalValidator({dateToKey: 'dateTo', dateFromKey: 'dateFrom'}),
      ],
    );
  }
}
```

- `requiredSomeValueByKeysValidator`

```typescript
import {requiredSomeValueByKeysValidator} from '@angular-ru/cdk/validators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Component} from '@angular/core';

@Component()
export class AppComponent {
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.validForm = new FormGroup(
      {
        a: new FormControl(13),
        b: new FormGroup({
          c: new FormControl(),
        }),
      },
      [requiredSomeValueByKeysValidator(['a', 'b.c'])],
    );

    this.invalidForm = new FormGroup(
      {
        a: new FormControl(),
        b: new FormGroup({
          c: new FormControl(),
        }),
      },
      [requiredSomeValueByKeysValidator(['a', 'b.c'])],
    );
  }
}
```

- `requiredSomeValueValidator`

```typescript
import {requiredSomeValueValidator} from '@angular-ru/cdk/validators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Component} from '@angular/core';

@Component()
export class AppComponent {
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.validForm = new FormGroup(
      {
        a: new FormControl(13),
        b: new FormControl(),
        c: new FormControl(),
      },
      [requiredSomeValueValidator()],
    );

    this.invalidForm = new FormGroup(
      {
        a: new FormControl(),
        b: new FormControl(),
        c: new FormControl(),
      },
      [requiredSomeValueValidator()],
    );
  }
}
```

- `everyArrayItemValidator`

```typescript
import {everyArrayItemValidator} from '@angular-ru/cdk/validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component} from '@angular/core';

@Component()
export class AppComponent {
  public validForm: FormGroup;
  public invalidForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.validForm = this.fb.group({
      items: this.fb.control(['st1', 'st2'], {
        validators: everyArrayItemValidator([Validators.minLength(2), Validators.maxLength(10)]),
      }),
    });

    this.invalidForm = this.fb.group({
      items: this.fb.control(['s', 'st2'], {
        validators: everyArrayItemValidator([Validators.minLength(2), Validators.maxLength(10)]),
      }),
    });
  }
}
```

- `longValidator`

```typescript
import {longValidator} from '@angular-ru/cdk/validators';
import {FormControl} from '@angular/forms';
import {Component} from '@angular/core';

@Component()
export class AppComponent {
  // valid range: ('-9223372036854775808', '9223372036854775807')
  public control: FormControl = new FormControl(null, longValidator());
}
```
