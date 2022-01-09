import { Type } from '@angular/core';
import { Any, Fn } from '@angular-ru/cdk/typings';

import { GroupLevel, LoggerLevel } from '../../interfaces/logger.external';
import { groupDecoratorFactory } from './group.common';

export function Group(title: string | Fn, level: LoggerLevel = LoggerLevel.INFO): MethodDecorator {
    return function (
        _target: Type<unknown>,
        _key: string,
        descriptor: TypedPropertyDescriptor<Any>
    ): TypedPropertyDescriptor<Any> {
        const method: Any = descriptor.value;

        descriptor.value = function (...args: Any[]): unknown {
            return groupDecoratorFactory(level, GroupLevel.GROUP, method, title, args, this as Any);
        };

        return descriptor;
    } as Any;
}
