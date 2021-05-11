import { EslintRules } from './interfaces/eslint-rules';
import { noSuffixFile } from './rules/no-siffix-file/no-suffix-file';

const RULES: EslintRules = {
    'no-suffix-file': noSuffixFile()
};

export { RULES as rules };
