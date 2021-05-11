import { Rule } from 'eslint';

export const NO_SUFFIX_SCHEMA: Rule.RuleMetaData['schema'] = [
    {
        type: 'object',
        additionalProperties: false,
        properties: { fileEndsWithList: { type: 'array' } }
    }
];
