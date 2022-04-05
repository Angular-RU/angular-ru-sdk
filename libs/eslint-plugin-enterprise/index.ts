import { Rule } from 'eslint';

import { noSuffixFile } from './no-suffix-file';

interface EslintRules {
    [name: string]: Rule.RuleModule;
}

const RULES: EslintRules = {
    'no-suffix-file': noSuffixFile()
};

export { RULES as rules };
