import { Rule } from 'eslint';

export function getOptions<T>(context: Rule.RuleContext): T {
    return context.options[0] as T;
}
