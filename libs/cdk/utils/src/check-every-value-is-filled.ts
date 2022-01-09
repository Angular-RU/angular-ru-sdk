import { Any } from '@angular-ru/cdk/typings';

import { checkValueIsFilled } from './check-value-is-filled';

export function checkEveryValueIsFilled(...values: Any[]): boolean {
    return values.every(checkValueIsFilled);
}
