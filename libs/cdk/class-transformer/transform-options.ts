import {TransformOptions} from 'class-transformer/types/interfaces';

export const ONLY_TO_CLASS: TransformOptions = {toClassOnly: true} as const;
export const ONLY_TO_PLAIN: TransformOptions = {toPlainOnly: true} as const;
