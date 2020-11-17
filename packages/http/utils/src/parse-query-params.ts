import { DefaultUrlSerializer } from '@angular/router';
import { PlainObject } from '@angular-ru/common/typings';

export function parseQueryParams(path: string): PlainObject {
    return new DefaultUrlSerializer().parse(path).queryParams;
}
