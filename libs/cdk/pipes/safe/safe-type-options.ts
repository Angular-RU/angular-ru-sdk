import {SafeValueType} from './safe-value-type';

export type SafeTypeOptions =
    | SafeValueType
    | 'html'
    | 'style'
    | 'script'
    | 'url'
    | 'resourceUrl';
