#### `@angular-ru/common/validators`

-   `emptyValidator`

```ts
import { emptyValidator } from '@angular-ru/common/form';
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
