#### `@angular-ru/cdk/ivy`

-   `useInjector` - Access to DI inside decorators by class constructor

```typescript
import { Component, Injector } from '@angular/core';
import { useInjector } from '@angular-ru/cdk/ivy';

import { UserService } from './test.service.ts';

function Username(): PropertyDecorator {
    return <T extends typeof Object.prototype>(prototypeRef: T, propertyKey: string | symbol): void => {
        useInjector(prototypeRef.constructor, (injector: Injector, instance: any): void => {
            const userService: UserService = injector.get(UserService);
            instance[propertyKey] = userService.username;
        });
    };
}

@Component({
    selector: 'test-component',
    template: ''
})
class TestComponent {
    @Username()
    public username!: string; // username will appear here after the constructor has completed
}
```
