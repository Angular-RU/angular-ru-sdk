const SPACE_INDENT: number = 4;

export function stringify<T>(value: T, spaceIndent: number = SPACE_INDENT): string {
    return String(JSON.stringify(value, null, spaceIndent)).toString();
}
