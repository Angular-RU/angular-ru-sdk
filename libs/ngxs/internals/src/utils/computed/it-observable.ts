import { Any } from '@angular-ru/cdk/typings';
import { isObservable } from 'rxjs';

export function itObservable(value: Any): boolean {
    let observable: boolean = false;

    if (isObservable(value)) {
        observable = true;
    }

    return observable;
}
