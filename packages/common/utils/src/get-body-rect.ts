import { Nullable } from '@angular-ru/common/typings';

export function getBodyRect(): Nullable<ClientRect | DOMRect> {
    return document.querySelector('body')?.getBoundingClientRect();
}
