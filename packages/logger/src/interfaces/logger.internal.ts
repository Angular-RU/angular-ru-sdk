// eslint-disable-next-line
export type Any = any; // NOSONAR
export type Fn<T = unknown, U = unknown> = (...args: T[]) => U;
export type Arguments<T = unknown> = T[];

export interface ObjectKeyMap<T = Any> {
    [key: string]: T;
}

export type DecoratorMethod = (target: Any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

export interface ClipboardData {
    setData: (type: string, value: string) => void | boolean;
}

export type Callback<T = void> = (...args: T[]) => T;
export type Descriptor<T = unknown> = PropertyDescriptor & ThisType<T>;

export interface ConsoleServiceInterface {
    getTemplateWithoutLabel(): string;
}

export interface Clipboard {
    readonly clipboardSetData: SetDataType;
    readonly queryCommandCopy: boolean;

    copyOnBuffer(data: unknown): boolean;

    textAreaSelectData(value: string): boolean;
}

export type SetDataType = (format: string, data: string) => void | boolean;
