import {Type} from '@angular/core';
import {isString} from '@angular-ru/cdk/string';
import {Fn} from '@angular-ru/cdk/typings';

import {GroupLevel, GroupMethod, LoggerLevel} from '../../interfaces/logger.external';
import {LoggerInjector} from '../../logger.injector';
import {LoggerService} from '../../logger.service';
import {GroupFactory} from '../../services/group-factory.service';

// eslint-disable-next-line max-params-no-constructor/max-params-no-constructor
export function groupDecoratorFactory(
    level: LoggerLevel,
    groupType: GroupLevel,
    method: Fn,
    title: string | Fn<string>,
    args: any[],
    target: Type<unknown>,
): unknown {
    const logger: LoggerService =
        LoggerInjector.getInjector().get<LoggerService>(LoggerService);
    const groupFactory: GroupFactory =
        LoggerInjector.getInjector().get<GroupFactory>(GroupFactory);
    const groupMethod: GroupMethod = groupFactory[groupType].bind(
        groupFactory,
    ) as GroupMethod;
    const label: string = isString(title) ? title : title(...args);

    groupMethod(label, null, logger, level);
    const result: unknown = method.apply(target, args);

    if (logger.level <= level) {
        logger.close();
    }

    return result;
}
