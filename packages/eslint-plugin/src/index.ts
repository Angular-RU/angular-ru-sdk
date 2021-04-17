import { EslintRule } from './interfaces/eslint-rule';
import { noEnumSuffixRule } from './rules/no-enum-suffix-rule';
import { noModelSuffixRule } from './rules/no-model-suffix-rule';

const RULES: EslintRule = {
    'no-model-suffix': noModelSuffixRule(),
    'no-enum-suffix': noEnumSuffixRule()
};

export { RULES as rules };
