import { PlainObject } from '@angular-ru/common/typings';

export type IdsMapOf<T extends PlainObject, K extends keyof T = 'id'> = Record<T[K], T>;
