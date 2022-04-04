// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

export function checkIsNodeEnvironment(): boolean {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!require) {
        throw new Error(`This code can be running only Node.js environments.`);
    }

    return true;
}
