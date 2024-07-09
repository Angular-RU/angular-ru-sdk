import {Type} from '@angular/core';

export function typeofType<T>(classType: Type<T>): () => Type<T> {
    return (): Type<T> => classType;
}
