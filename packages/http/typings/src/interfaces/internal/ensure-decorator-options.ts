import { Any, Descriptor } from '@angular-ru/common/typings';

import { RequestType } from '../../enums/request-type.enum';

export interface EnsureDecoratorOptions {
    path: string;
    type: RequestType;
    target: Any;
    descriptor: Descriptor;
}
