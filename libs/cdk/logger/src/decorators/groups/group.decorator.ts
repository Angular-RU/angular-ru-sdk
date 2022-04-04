import { Type } from '@angular/core';
import { Fn } from '@angular-ru/cdk/typings';

import { GroupLevel, LoggerLevel } from '../../interfaces/logger.external';
import { groupDecoratorFactory } from './group.common';

export function Group(title: string | Fn, level: LoggerLevel = LoggerLevel.INFO): MethodDecorator {
    return function (
        _target: Type<unknown>,
        _key: string,
        descriptor: TypedPropertyDescriptor<any>
    ): TypedPropertyDescriptor<any> {
        const method: any = descriptor.value;

        descriptor.value = function (...args: any[]): unknown {
            return groupDecoratorFactory(level, GroupLevel.GROUP, method, title, args, this as any);
        };

        return descriptor;
    } as any;
}
