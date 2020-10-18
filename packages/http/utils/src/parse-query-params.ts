import { PlainObject } from '@angular-ru/common/typings';
import { DefaultUrlSerializer } from '@angular/router';

export function parseQueryParams(path: string): PlainObject {
    return new DefaultUrlSerializer().parse(path).queryParams;
}
