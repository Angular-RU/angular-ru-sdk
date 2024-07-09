import {takeFirstItem} from '@angular-ru/cdk/array';

export function getPathWithoutQueryParams(path: string): string {
    return takeFirstItem(path.split('?')) ?? '';
}
