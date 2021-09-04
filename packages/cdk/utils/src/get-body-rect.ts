import { Nullable } from '@angular-ru/cdk/typings';

export function getBodyRect(): Nullable<ClientRect | DOMRect> {
    return document.querySelector('body')?.getBoundingClientRect();
}
