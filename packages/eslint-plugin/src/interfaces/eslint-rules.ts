import { Rule } from 'eslint';

export interface EslintRules {
    [name: string]: Rule.RuleModule;
}
