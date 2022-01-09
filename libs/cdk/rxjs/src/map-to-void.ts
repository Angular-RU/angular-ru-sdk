import { Any } from '@angular-ru/cdk/typings';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapToVoid(): OperatorFunction<Any, void> {
    return map((_: Any): void => undefined);
}
