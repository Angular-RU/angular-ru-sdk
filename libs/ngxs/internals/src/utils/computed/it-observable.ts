import { isObservable } from 'rxjs';

export function itObservable(value: unknown | any): boolean {
    let observable: boolean = false;

    if (isObservable(value)) {
        observable = true;
    }

    return observable;
}
