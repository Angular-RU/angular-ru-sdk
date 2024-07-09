import {Nullable} from '@angular-ru/cdk/typings';

export function getBodyRect(): Nullable<DOMRect> {
    return document.querySelector('body')?.getBoundingClientRect();
}
