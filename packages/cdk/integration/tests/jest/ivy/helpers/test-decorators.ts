import { Injector, NgZone } from '@angular/core';
import { useInjector } from '@angular-ru/cdk/ivy';
import { Any } from '@angular-ru/cdk/typings';

import { FeatureTestService, TestService } from './test-default';

export function InjectTestService(): PropertyDecorator {
    return <T extends typeof Object.prototype>(prototypeRef: T, propertyKey: string | symbol): void => {
        useInjector(prototypeRef.constructor, (injector: Injector, instance: Any): void => {
            instance[propertyKey] = injector.get(TestService);
        });
    };
}

export function InjectFeatureTestService(): PropertyDecorator {
    return <T extends typeof Object.prototype>(prototypeRef: T, propertyKey: string | symbol): void => {
        useInjector(prototypeRef.constructor, (injector: Injector, instance: Any): void => {
            const service: FeatureTestService = injector.get(FeatureTestService);
            service.callsCounter++;
            instance[propertyKey] = service;
        });
    };
}

export function InjectNgZone(): PropertyDecorator {
    return <T extends typeof Object.prototype>(prototypeRef: T, propertyKey: string | symbol): void => {
        useInjector(prototypeRef.constructor, (injector: Injector, instance: Any): void => {
            instance[propertyKey] = injector.get(NgZone);
        });
    };
}

export function InjectByToken(token: Any): PropertyDecorator {
    return <T extends typeof Object.prototype>(prototypeRef: T, propertyKey: string | symbol): void => {
        useInjector(prototypeRef.constructor, (injector: Injector, instance: Any): void => {
            instance[propertyKey] = injector.get(token);
        });
    };
}
