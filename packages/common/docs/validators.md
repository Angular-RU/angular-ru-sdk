#### `@angular-ru/common/validators`

-   `emptyValidator`

```ts
import { emptyValidator } from '@angular-ru/common/validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component()
export class AppComponent {
    public form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group(
            {
                name: '',
                lastName: ''
            },
            { validators: emptyValidator }
        );
    }
}
```

-   `maxDateValidator, minDateValidator`

```ts
import { maxDateValidator, maxDateValidator } from '@angular-ru/common/validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component()
export class AppComponent {
    public form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = new FormControl(toUtc({ month: new Date().getMonth() - 4 }), [
            // toUtc({ month: new Date().getMonth() - 3 }) generates a Timestamp equals to 3 months ago
            minDateValidator(toUtc({ month: new Date().getMonth() - 3 })),
            maxDateValidator(toUtc({ month: new Date().getMonth() - 1 }))
        ]);
    }
}
```

-   `dateMaxIntervalValidator, dateMinIntervalValidator`

```ts
import { dateMaxIntervalValidator, dateMinIntervalValidator } from '@angular-ru/common/validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component()
export class AppComponent {
    public form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = new FormGroup(
            {
                dateFrom: new FormControl(toUtc({ month: new Date().getMonth() - 1 })),
                dateTo: new FormControl(toUtc())
            },
            [
                // new Date(0).setDate(40) generates 40-days time interval (in Timestamp)
                dateMinIntervalValidator(new Date(0).setDate(40), { dateToKey: 'dateTo', dateFromKey: 'dateFrom' }),
                dateMaxIntervalValidator(new Date(0).setDate(70), { dateToKey: 'dateTo', dateFromKey: 'dateFrom' })
            ]
        );
    }
}
```
