#### `@angular-ru/cdk/rxjs`

- `mapToVoid`

```typescript
import {mapToVoid} from '@angular-ru/cdk/rxjs';

of([1, 2, 3])
  .pipe(mapToVoid())
  .subscribe((result) => {
    console.log(result); // undefined
  });
```
