import {isObservable} from 'rxjs';

export function itObservable(value: any | unknown): boolean {
    let observable = false;

    if (isObservable(value)) {
        observable = true;
    }

    return observable;
}
