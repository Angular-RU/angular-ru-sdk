import { isError } from './is-error';

export function errorHandler(err: unknown): void {
    if (isError(err as string)) {
        throw new Error(err as string);
    }
}
