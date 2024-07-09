import {Descriptor} from '@angular-ru/cdk/typings';

import {RequestType} from '../../enums/request-type';
import {EmitOptions} from '../emit-options';

export interface EnsureDecoratorOptions {
    path: string;
    type: RequestType;
    target: any;
    descriptor: Descriptor;
    emitOptions: EmitOptions;
}
