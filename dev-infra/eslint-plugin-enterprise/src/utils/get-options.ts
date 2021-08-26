import { firstItem } from '@angular-ru/common/array';
import { Rule } from 'eslint';

export function getOptions<T>(context: Rule.RuleContext): T {
    return firstItem(context.options) as T;
}
