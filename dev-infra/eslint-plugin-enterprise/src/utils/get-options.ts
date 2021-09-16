import { takeFirstItem } from '@angular-ru/cdk/array';
import { Rule } from 'eslint';

export function getOptions<T>(context: Rule.RuleContext): T {
    return takeFirstItem(context.options) as T;
}
