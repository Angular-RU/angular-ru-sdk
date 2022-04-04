import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapToVoid(): OperatorFunction<any, void> {
    return map((_: any): void => undefined);
}
