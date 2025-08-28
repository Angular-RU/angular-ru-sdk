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

export const MY_FIRST_EXTENSION = makeEnvironmentProviders([
  {
    provide: NGXS_PLUGINS,
    useClass: MySuperService,
    multi: true,
  },
]);

export const MY_SECOND_EXTENSION = makeEnvironmentProviders([
  {
    provide: NGXS_PLUGINS,
    useClass: FeatureService,
    multi: true,
  },
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
