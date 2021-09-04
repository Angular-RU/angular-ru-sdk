import { firstItem } from '@angular-ru/cdk/array';

export function getPathWithoutQueryParams(path: string): string {
    return firstItem(path.split('?')) ?? '';
}
