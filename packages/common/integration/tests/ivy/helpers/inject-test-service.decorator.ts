import { Injector } from '@angular/core';
import { useInjector } from '@angular-ru/common/ivy';
import { Any } from '@angular-ru/common/typings';

import { TestService } from './test.service';

export function InjectTestService(): PropertyDecorator {
    return <T extends typeof Object.prototype>(prototypeRef: T, propertyKey: string | symbol): void => {
        useInjector(prototypeRef.constructor, (injector: Injector, instance: Any): void => {
            instance[propertyKey] = injector.get(TestService);
        });
    };
}
