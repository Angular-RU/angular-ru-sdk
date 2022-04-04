import { Fn } from '@angular-ru/cdk/typings';

import { GroupLevel, LoggerLevel } from '../../interfaces/logger.external';
import { groupDecoratorFactory } from './group.common';

export function GroupCollapsed(title: string | Fn, level: LoggerLevel = LoggerLevel.INFO): MethodDecorator {
    return function (
        _target: unknown,
        _key: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): TypedPropertyDescriptor<any> {
        const method: Fn = descriptor.value;

        descriptor.value = function (...args: any[]): unknown {
            return groupDecoratorFactory(level, GroupLevel.GROUP_COLLAPSED, method, title, args, this as any);
        };

        return descriptor;
    };
}
