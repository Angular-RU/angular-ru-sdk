import {Injectable} from '@angular/core';
import {Nullable, PlainObject, PlainObjectOf} from '@angular-ru/cdk/typings';

import {FormatOutput, LoggerLevel, LoggerOptions} from './interfaces/logger.external';
import {COLORS, LABELS} from './logger.config';

@Injectable()
export class LoggerOptionsImpl implements LoggerOptions {
    public instance: Console = console;
    public minLevel: LoggerLevel = LoggerLevel.ALL;
    public globalLineStyle = '';
    public cssClassMap: PlainObject = {};
    public useLevelGroup = true;
    public labelColors: PlainObjectOf<string> = {
        [LoggerLevel.TRACE]: COLORS.TRACE,
        [LoggerLevel.DEBUG]: COLORS.DEBUG,
        [LoggerLevel.INFO]: COLORS.INFO,
        [LoggerLevel.WARN]: COLORS.WARN,
        [LoggerLevel.ERROR]: COLORS.ERROR,
    };

    public labelNames: PlainObjectOf<string> = {
        [LoggerLevel.TRACE]: LABELS.TRACE,
        [LoggerLevel.DEBUG]: LABELS.DEBUG,
        [LoggerLevel.INFO]: LABELS.INFO,
        [LoggerLevel.WARN]: LABELS.WARN,
        [LoggerLevel.ERROR]: LABELS.ERROR,
    };

    public format(label: Nullable<string>, style: string): FormatOutput {
        return {label: `[${label}]:`, style};
    }
}
