## Extension API

```typescript
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
// ...

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxsDataPlugin(
      MY_FIRST_EXTENSION,
      MY_SECOND_EXTENSION,
      MY_THIRD_EXTENSION,
      MY_FOURTH_EXTENSION,
      MY_FIFTH_EXTENSION,
    ),
  ],
};
```

`my-extensions.ts` - you can define any providers in your app config:

```typescript
import {makeEnvironmentProviders} from '@angular/core';
import {withNgxsPlugin} from '@ngxs/store';

export const MY_FIRST_EXTENSION = withNgxsPlugin(MySuperService);

export const MY_SECOND_EXTENSION = makeEnvironmentProviders([
  withNgxsPlugin(FeatureService),
  {
    provide: MyInjectableToken,
    useFactory: (): MyFactory => new MyFactory(),
  },
]);

export const MY_THIRD_EXTENSION = makeEnvironmentProviders([provideMySuperPluginA(), provideMySuperPluginB()]);

export const MY_FOURTH_EXTENSION = makeEnvironmentProviders([MyInjectableService]);

export const MY_FIFTH_EXTENSION = makeEnvironmentProviders([
  {
    provide: MY_TOKEN,
    useValue: 'VALUE',
  },
]);
```
