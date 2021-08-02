export interface ClipboardData {
    setData: (type: string, value: string) => void | boolean;
}

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
