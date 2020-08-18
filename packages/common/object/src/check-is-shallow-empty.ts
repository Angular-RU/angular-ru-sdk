import { clean } from './clean';

export function checkIsShallowEmpty<T>(definition: T | null): boolean {
    return Object.keys(clean(definition ?? {})).length === 0;
}
