# Angular Logger

> Lightweight and configurable Angular logger

```typescript
import {provideLogger} from '@angular-ru/cdk/logger';

export const appConfig: ApplicationConfig = {
  providers: [provideLogger()],
};
```

## Motivation

This logger is a handy tool that can be useful in the design and development of the enterprise application level. Easy
setting of logging levels and convenient work with groups. Among other things, you can use meta programming
(decorators).

## Table of contents

- [Logging](#)
  - [Basic usage API `trace`, `debug`, `info`, `warn`, `error`](#example-basic-methods)
  - [Groups, `groupCollapsed`, `collapsible`](#example-groups)
  - [Nested groups (usage pipe method)](#example-nested-groups)
  - [Set logging level (worked in single or groups)](#example-set-minimal-logging-level)
  - [Customization style line](#example-set-style-line)
  - [Customization global style line](#example-set-global-style-line)
  - [Add css classes](#example-css-classes)
  - [Output pretty json `stringify`](#example-pretty-json)
  - [Basic decorators](#example-decorators)
  - [Decorator groups](#example-decorator-groups)
  - [Decorator groups with function title](#example-decorator-group-with-function-title)
  - [Configuration `Angular Logger`](#example-full-configurations)

* [Todo](#todo)

## Logging

```
$ npm install @angular-ru/cdk --save
```

```typescript
import {provideLogger} from '@angular-ru/cdk/logger';

export const appConfig: ApplicationConfig = {
  providers: [provideLogger()],
};
```

[**Online demo**](https://angular-ru.github.io/sdk/logger-demo)

![](https://habrastorage.org/webt/lq/a9/_s/lqa9_sp8gxkwax_sy6x9w3qf5ry.gif)

### Example: basic methods

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.trace('trace is worked', 1, {a: 1});
    this.logger.debug('debug is worked', 2, {});
    this.logger.info('info is worked', 3, Object);
    this.logger.warn('warn is worked', 4, String);
    this.logger.error('error is worked', 5, (2.55).toFixed());
  }
}
```

- **Default level: All**

![](https://habrastorage.org/webt/0u/yj/1t/0uyj1tli-mzh0cor1cg4jwphsdk.png)

- **Disable trace on console (filter):**

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.group('Show trace in opened group', ({trace}: LoggerService): void => {
      for (let i: number = 0; i < 20; i++) {
        trace('trace is worked', i);
      }
    });
  }
}
```

### Example: groups

- **Logger groups with auto closed (usage callback):**

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.groupCollapsed('EXAMPLE 2: show stack', () => {
      this.logger.trace('trace is worked', 1, {a: 1});
      this.logger.debug('debug is worked', 2, console);
      this.logger.info('info is worked', 3, Object);
      this.logger.warn('warn is worked', 4, String);
      this.logger.error('error is worked', 5, (2.55).toFixed());
    });

    this.logger.group('Show trace in opened group', ({trace}: LoggerService): void => {
      for (let i: number = 0; i < 20; i++) {
        trace('trace is worked', i);
      }
    });

    this.logger.groupCollapsed('Show trace in collapsed group', ({debug}: LoggerService): void => {
      for (let i: number = 0; i < 15; i++) {
        debug('debug is worked', i);
      }
    });
  }
}
```

![](https://habrastorage.org/webt/oo/ob/uh/ooobuhwfa3ncpctwirtirgmth6y.png)

### Example: nested groups

- **Logger nested groups (with pipe):**

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger
      .groupCollapsed('GROUP TEST')
      .pipe(({trace, debug, info, warn, error}: LoggerService) => {
        trace('trace is worked');
        debug('debug is worked');
        info('info is worked');
        warn('warn is worked');
        error('error is worked');
      })
      .close();

    this.logger
      .group('A')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .groupCollapsed('B')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .group('C')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .closeAll();
  }
}
```

![](https://habrastorage.org/webt/_n/wz/8l/_nwz8l25o12tmu0d8sxyyjttmck.gif)

### Example: set minimal logging level

Basic parameterization

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.trace('trace is worked', 1, {a: 1});
    this.logger.debug('debug is worked', 2, console);
    this.logger.info('info is worked', 3, Object);
    this.logger.warn('warn is worked', 4, String);
    this.logger.error('error is worked', 5, (2.55).toFixed());

    this.logger.level = LoggerLevel.INFO;
    this.logger.log('Set new logger level');

    this.logger.trace('trace is worked', 1, {a: 1});
    this.logger.debug('debug is worked', 2, console);
    this.logger.info('info is worked', 3, Object);
    this.logger.warn('warn is worked', 4, String);
    this.logger.error('error is worked', 5, (2.55).toFixed());
  }
}
```

![](https://habrastorage.org/webt/0r/ya/xn/0ryaxnmaedlbc14imvodsezq4lg.png)

- **Logger level groups (pretty usage API):**

```typescript
import {LoggerService, LoggerLevel} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.level = LoggerLevel.INFO;

    this.logger.trace
      .group('A')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .close()

      .debug.group('B')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .close()

      .info.group('C')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .close()

      .warn.group('D')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .close()

      .error.group('E')
      .pipe(
        ({trace}: LoggerService) => trace('trace is worked'),
        ({debug}: LoggerService) => debug('debug is worked'),
        ({info}: LoggerService) => info('info is worked'),
        ({warn}: LoggerService) => warn('warn is worked'),
        ({error}: LoggerService) => error('error is worked'),
      )
      .close();

    this.logger.level = LoggerLevel.ALL;
  }
}
```

![](https://habrastorage.org/webt/x-/lm/pl/x-lmplcexk_nd0icuqe6ehslub4.png)

### Example: set style line

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.clear();

    this.logger.css('text-transform: uppercase; font-weight: bold').debug('window current ', window);
    this.logger.css('color: red; text-decoration: underline; font-weight: bold').info('It is awesome logger');
    this.logger.debug({a: 1});

    this.logger.warn(setStyle);
    this.logger.info('For global configuration, use the constructor parameters');
  }
}
```

![](https://habrastorage.org/webt/8b/dn/nv/8bdnnvsgj1m2rxnssviqptks874.png)

### Example: set global style line

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.clear();

    this.logger.css('font-weight: normal; text-decoration: none; font-style: italic').info(3.14);
    this.logger.css('font-weight: normal;').info(3.14);
    this.logger.warn('global format with style!');
  }
}
```

![](https://habrastorage.org/webt/y4/wm/vz/y4wmvzvsmtzt6zdqjcupxqmvodm.png)

### Example: CSS classes

```typescript
import {provideLogger} from '@angular-ru/cdk/logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLogger({
      cssClassMap: {
        bold: 'font-weight: bold',
        'line-through': 'text-decoration: line-through',
        'code-sandbox': `
                  color: #666;
                  background: #f4f4f4;
                  border-left: 3px solid #f36d33;
                  font-family: monospace;
                  font-size: 15px;`,
      },
    }),
  ],
};
```

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.cssClass('bold line-through').log('JavaScript sucks', 'JavaScript is the best');

    this.logger
      .cssClass('code-sandbox')
      .log('\n   @Component({ .. })' + '\n   export class AppComponent { .. }    \n\n');

    this.logger.cssClass('bold line-through').debug('JavaScript sucks', 'JavaScript is the best');
  }
}
```

![](https://habrastorage.org/webt/d5/tm/aa/d5tmaaomjql5px_wkzxnodhacnk.png)

### Example: pretty json

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    // default browser print json
    this.logger.debug('Classic output json', jsonExample);

    // for pretty json usage logger.log method
    this.logger.log(...this.logger.prettyJSON(jsonExample));
  }
}
```

![](https://habrastorage.org/webt/eo/ej/k5/eoejk5t_hqvo2xeaitkbzm43grm.png)

### Example: decorators

```typescript
import {
  LoggerService,
  Logger,
  DebugLog,
  TraceLog,
  InfoLog,
  WarnLog,
  ErrorLog,
  Log,
  LogFn,
} from '@angular-ru/cdk/logger';

export class AppComponent {
  @Logger() public logger: LoggerService;
  @TraceLog() public trace: LogFn;
  @DebugLog() public debug: LogFn;
  @InfoLog() public info: LogFn;
  @ErrorLog() public error: LogFn;
  @WarnLog() public warn: LogFn;
  @Log() public log: LogFn;

  public showExample(): void {
    this.logger.clear();
    this.logger.log('log is worked');
    this.trace('trace is worked', 1, {a: 1});
    this.debug('debug is worked', 2, console);
    this.info('info is worked', 3, Object);
    this.warn('warn is worked', 4, String);
    this.error('error is worked', 5, (2.55).toFixed());
  }
}
```

![](https://habrastorage.org/webt/fk/ar/a5/fkara5xhh75iz1q9_dales4cu9s.png)

### Example: decorator groups

```typescript
import {LoggerService, Logger, LoggerLevel, Group} from '@angular-ru/cdk/logger';

export class AppComponent {
  @Logger() public logger: LoggerService;

  @Group('test title', LoggerLevel.WARN)
  private helloWorld(name: string): string {
    this.logger.log('log only in group', name);
    return 'hello world';
  }

  public showExample11(): void {
    this.logger.log(this.helloWorld('Hello'));
  }
}
```

![](https://habrastorage.org/webt/na/bu/zw/nabuzwdhsanhy0sznh5tvwdu8es.png)

### Example: decorator group with function title

```typescript
import {Log, LogFn, Group} from '@angular-ru/cdk/logger';

export class AppComponent {
  @Log() public log: LogFn;

  @Group((name: string) => `Test group with ${name}`)
  public method(name: string): string {
    this.log('group is worked');
    return name;
  }

  public showExample(): void {
    this.method('hello world');
  }
}
```

![](https://habrastorage.org/webt/j9/mz/4v/j9mz4vbyhi0dg_8kr5wjmfwgiye.png)

### Example: timer decorator

```typescript
import {Log, LogFn, TimerLog, LoggerLevel, LoggerService, Logger} from '@angular-ru/cdk/logger';
export class AppComponent {
  @Log() public log: LogFn;
  @Logger() public logger: LoggerService;

  @TimerLog('Test timer')
  public showExample(): void {
    this.logger.clear();
    this.log('test log');
  }

  @TimerLog('Advanced timer', LoggerLevel.WARN, false)
  public showExample(): void {
    this.logger.clear();
    this.log('Advanced test log');
  }
}
```

![](https://habrastorage.org/webt/ur/zl/66/urzl66me9nixsnauhsfpge2tn0a.png)

### Example: format output

```typescript
import {FormatOutput, provideLogger} from '@angular-ru/cdk/logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLogger({
      format(label: string, labelStyle: string): FormatOutput {
        const date = new Date().toLocaleString('ru-RU').replace(',', '');
        const customLabel: string = `${date} ${label}`;
        return {label: customLabel, style: labelStyle};
      },
    }),
  ],
};
```

```typescript
import {LoggerService, OnInit} from '@angular-ru/cdk/logger';

export class AppComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.trace('trace is worked', 1, {a: 1});
    this.logger.debug('debug is worked', 2, {});
    this.logger.info('info is worked', 3, Object);
    this.logger.warn('warn is worked', 4, String);
    this.logger.error('error is worked', 5, (2.55).toFixed());
  }
}
```

![](https://habrastorage.org/webt/pi/gi/ax/pigiax25o6qapoen_9wjoy4jdio.png)

### Example: full configurations

```typescript
import {LoggerLevel, provideLogger} from '@angular-ru/cdk/logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLogger({
      useLevelGroup: true,
      globalLineStyle: 'color: red; text-decoration: underline; font-weight: bold; font-size: 15px',
      cssClassMap: {
        bold: 'font-weight: bold',
        'line-through': 'text-decoration: line-through',
        'code-sandbox': `
                  color: #666;
                  background: #f4f4f4;
                  border-left: 3px solid #f36d33;
                  font-family: monospace;
                  font-size: 15px;`,
      },
      labelNames: {
        [LoggerLevel.TRACE]: '[trace]',
        [LoggerLevel.DEBUG]: '[debug]',
        [LoggerLevel.INFO]: '[info]',
        [LoggerLevel.WARN]: '[warn]',
        [LoggerLevel.ERROR]: '[error]',
      },
      labelColors: {
        [LoggerLevel.TRACE]: 'violet',
        [LoggerLevel.DEBUG]: 'black',
        [LoggerLevel.INFO]: 'tomato',
        [LoggerLevel.WARN]: 'green',
        [LoggerLevel.ERROR]: 'cyan',
      },
    }),
  ],
};
```

```typescript
import {LoggerService} from '@angular-ru/cdk/logger';

export class AppComponent {
  constructor(private readonly logger: LoggerService) {}

  public showExample(): void {
    this.logger.log('Example');
    this.logger.trace('trace is worked', 1, {a: 1});
    this.logger.debug('debug is worked', 2, console);
    this.logger.info('info is worked', 3, Object);
    this.logger.warn('warn is worked', 4, String);
    this.logger.error('error is worked', 5, (2.55).toFixed());
  }
}
```

![](https://habrastorage.org/webt/we/vi/xw/wevixwtlrik5gqxfif2wadprura.png)

## Todo

- [x] Override console
- [x] Logger method (trace, debug, info, warning, error)
- [x] Logger group + groupCollapsible (pipes)
- [x] Logger pretty write object
- [x] Set style by css
- [x] Logger level groups (trace, debug, info, warn, error)
- [x] Clipboard data
- [x] Set global style
- [x] Added css classes
- [x] Dependency Injection for Angular
- [x] Switch enable/disable default console output
- [x] Decorators
- [x] Timers (decorator)
- [x] Format output console

## Authors

[Eleonora Zbarskaya](https://github.com/kingofferelden), [Ivanov Maxim](https://github.com/splincode)
