import {SafeValueType} from './safe-value-type';

export type SafeTypeOptions =
    | SafeValueType
    | 'html'
    | 'resourceUrl'
    | 'script'
    | 'style'
    | 'url';
