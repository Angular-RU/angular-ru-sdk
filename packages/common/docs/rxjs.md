#### `@angular-ru/common/rxjs`

-   `mapToVoid`

```ts
import { mapToVoid } from '@angular-ru/common/rxjs';

of([1, 2, 3])
    .pipe(mapToVoid())
    .subscribe((result) => {
        console.log(result); // undefined
    });
```
