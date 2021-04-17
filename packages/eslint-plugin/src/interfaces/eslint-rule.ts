import { Rule } from 'eslint';

export interface EslintRule {
    [name: string]: Rule.RuleModule;
}
