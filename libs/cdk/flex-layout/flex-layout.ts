import {
    FlexBottomIndent,
    FlexColumn,
    FlexContainer,
    FlexEnd,
    FlexFullWidth,
    FlexInline,
    FlexItem,
    FlexJustifyNormal,
    FlexNone,
    FlexSpaceBetween,
    FlexStart,
} from './directives';

export const FlexLayout = [
    FlexContainer,
    FlexNone,
    FlexColumn,
    FlexItem,
    FlexEnd,
    FlexStart,
    FlexInline,
    FlexFullWidth,
    FlexJustifyNormal,
    FlexSpaceBetween,
    FlexBottomIndent,
] as const;
