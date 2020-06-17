import { Type } from '@angular/core';

import { GroupLevel, LoggerLevel } from '../../interfaces/logger.external';
import { Any, Callback, DecoratorMethod, Fn } from '../../interfaces/logger.internal';
import { groupDecoratorFactory } from './group.common';

export function GroupCollapsed(title: string | Callback<Any>, level: LoggerLevel = LoggerLevel.INFO): DecoratorMethod {
    return (_target: Type<unknown>, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const method: Callback = descriptor.value;

        descriptor.value = function (...args: Any[]): unknown {
            return groupDecoratorFactory(level, GroupLevel.GROUP_COLLAPSED, method as Fn, title, args, this as Any);
        };

        return descriptor;
    };
}
