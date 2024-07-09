import {JoinMapTransformer} from './join-map-transformer';

export interface JoinPipeOptions<T> {
    separator?: string;
    mapTransformer?: JoinMapTransformer<T>;
}
