/* eslint-disable */
import { ObjectKeyMap } from '../../../src/interfaces/logger.internal';

export enum TestLoggerLineType {
    TABLE = 'table',
    ASSERT = 'assert',
    TRACE_OR_DEBUG = 'debug',
    LOG = 'log',
    DEBUG = 'info',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

export enum TestLoggerGroupType {
    GROUP_OPEN = 'group_open',
    GROUP_COLLAPSED_OPEN = 'group_collapsed_open',
    GROUP_END = 'group_end'
}

export class ConsoleFake implements Console {
    // tslint:disable-next-line:no-any
    public Console: any;
    private _stack: ObjectKeyMap[] = [];

    public log(...args: string[]): void {
        args.unshift(null!, null!);
        this._stack.push({ [TestLoggerLineType.LOG]: args });
    }

    public debug(...args: string[]): void {
        this._stack.push({ [TestLoggerLineType.TRACE_OR_DEBUG]: args });
    }

    public info(...args: string[]): void {
        this._stack.push({ [TestLoggerLineType.INFO]: args });
    }

    public assert(condition: boolean, output: string): void {
        if (!condition) {
            this._stack.push({ [TestLoggerLineType.ASSERT]: [output] });
        }
    }

    public table(data: unknown): void {
        this._stack.push({ [TestLoggerLineType.TABLE]: [data] });
    }

    public warn(...args: string[]): void {
        this._stack.push({ [TestLoggerLineType.WARN]: args });
    }

    public error(...args: string[]): void {
        this._stack.push({ [TestLoggerLineType.ERROR]: args });
    }

    public group(...args: string[]): void {
        this._stack.push({ [TestLoggerGroupType.GROUP_OPEN]: args });
    }

    public groupCollapsed(...args: string[]): void {
        this._stack.push({ [TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: args });
    }

    public groupEnd(): void {
        this._stack.push({ [TestLoggerGroupType.GROUP_END]: [] });
    }

    public createStack(...args: ObjectKeyMap[]): string {
        return JSON.stringify(args);
    }

    public stack(withoutLabel: number = 2): string {
        const history: ObjectKeyMap = [...this._stack];
        history.forEach((line: object, index: number) => {
            for (const arg in line) {
                if (line.hasOwnProperty(arg)) {
                    const isArray: boolean = Array.isArray((line as any)[arg]);
                    history[index] = { [arg]: isArray ? (line as any)[arg].slice(withoutLabel) : (line as any)[arg] };
                }
            }
        });

        return JSON.stringify(history);
    }

    public stackList(stack: string): string[] {
        const stackObject: ObjectKeyMap = JSON.parse(stack);
        const stackList: string[] = [];

        stackObject.forEach((line: string[]) => {
            for (const levelLog in line) {
                if (line.hasOwnProperty(levelLog)) {
                    stackList.push(line[levelLog]);
                }
            }
        });

        return stackList;
    }
    public stackOptionsList(usageNext: boolean = false): ObjectKeyMap {
        const stackList: string[] = this.stackList(this.stack(0));
        const stackOptionsList: ObjectKeyMap = [];

        stackList.forEach((line: string) => {
            stackOptionsList.push({
                label: String(line[0]).replace('%c', ''),
                styles: this.parseCssString(line[usageNext ? 2 : 1])
            });
        });

        return stackOptionsList;
    }

    private parseCssString(css: string): ObjectKeyMap {
        const result: ObjectKeyMap = {};
        const attributes: string[] = css.split(';');

        attributes.forEach((attribute: string) => {
            const entry: string[] = attribute.split(':');
            const property: string = String(entry.splice(0, 1)[0]).trim();
            const options: string = entry.join(':').trim();
            if (property.length) {
                result[property] = options;
            }
        });

        return result;
    }

    public clear(): void {
        this._stack = [];
    }

    public count(): void {
        // noop;
    }

    public memory(): void {
        // noop;
    }

    public dir(): void {
        // noop;
    }

    public dirxml(): void {
        // noop;
    }

    public exception(): void {
        // noop;
    }

    public markTimeline(): void {
        // noop;
    }

    public profile(): void {
        // noop;
    }

    public profileEnd(): void {
        // noop;
    }

    public time(): void {
        // noop;
    }

    public timeEnd(): void {
        // noop;
    }

    public timeStamp(): void {
        // noop;
    }

    public timeline(): void {
        // noop;
    }

    public timelineEnd(): void {
        // noop;
    }

    public trace(): void {
        // noop;
    }

    public countReset(): void {
        // noop;
    }

    public timeLog(): void {
        // noop;
    }
}
