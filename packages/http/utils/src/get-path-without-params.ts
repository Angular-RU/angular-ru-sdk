import { firstItem } from '@angular-ru/common/array';

export function getPathWithoutQueryParams(path: string): string {
    return firstItem(path.split('?')) || '';
}
