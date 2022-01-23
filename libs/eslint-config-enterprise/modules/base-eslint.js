/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parserOptions: {
        sourceType: 'module'
    },
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            extends: ['eslint:recommended'],
            rules: {
                'no-useless-rename': [
                    'error',
                    {
                        ignoreDestructuring: true,
                        ignoreImport: false,
                        ignoreExport: true
                    }
                ],
                'prefer-template': 'error',
                'no-invalid-this': 'off',
                'arrow-body-style': 'error',
                'arrow-parens': ['error', 'always'],
                camelcase: 'off',
                'comma-dangle': ['error', 'never'],
                'comma-spacing': ['error', { before: false, after: true }],
                complexity: ['error', { max: 6 }],
                curly: 'error',
                'dot-notation': 'off',
                'eol-last': 'error',
                eqeqeq: ['error', 'smart'],
                'guard-for-in': 'error',
                'id-match': [
                    'error',
                    '^[a-zA-Z_0-9$]*$',
                    {
                        properties: true,
                        ignoreDestructuring: false,
                        onlyDeclarations: false
                    }
                ],
                indent: 'off',
                'keyword-spacing': ['error', { before: true }],
                'max-classes-per-file': ['error', 1],
                'max-depth': ['error', 4],
                'max-len': [
                    'error',
                    {
                        code: 120,
                        ignoreTemplateLiterals: true,
                        ignoreRegExpLiterals: true,
                        ignoreStrings: true,
                        ignoreComments: true
                    }
                ],
                'max-lines-per-function': [
                    'error',
                    {
                        max: 20,
                        skipBlankLines: true,
                        skipComments: true,
                        IIFEs: true
                    }
                ],
                'max-nested-callbacks': ['error', 3],
                'max-params': 'off',
                'new-parens': 'error',
                'no-bitwise': 'off',
                'no-caller': 'error',
                'no-cond-assign': 'error',
                'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
                'no-param-reassign': ['error'],
                'no-constant-condition': 'error',
                'no-debugger': 'error',
                'no-empty': 'off',
                'no-empty-functions': 'off',
                'no-eval': 'error',
                'no-fallthrough': 'error',
                'no-magic-numbers': 'off',
                'no-unmodified-loop-condition': 'error',
                'no-multiple-empty-lines': 'error',
                'no-negated-condition': 'error',
                'no-nested-ternary': 'error',
                'no-new-wrappers': 'error',
                'no-prototype-builtins': 'off',
                'no-redeclare': 'off',
                'no-restricted-exports': ['error'],
                'no-restricted-syntax': [
                    'error',
                    {
                        selector: 'TSEnumDeclaration:not([const=true])',
                        message: "Don't declare non-const enums"
                    },
                    {
                        selector: 'MethodDefinition[static = true] ThisExpression',
                        message: "Don't use this in static methods"
                    }
                ],
                'no-return-assign': ['error', 'always'],
                'no-self-assign': 'error',
                'no-shadow': 'off',
                'no-sparse-arrays': 'error',
                'no-throw-literal': 'error',
                'no-trailing-spaces': 'error',
                'no-undef-init': 'error',
                'no-unneeded-ternary': 'error',
                'no-unsafe-finally': 'error',
                'no-unused-expressions': 'error',
                'no-unused-labels': 'error',
                'no-useless-escape': 'off',
                'no-var': 'error',
                'object-curly-spacing': ['error', 'always'],
                'object-shorthand': 'error',
                'one-var': [
                    'error',
                    {
                        var: 'never',
                        let: 'never',
                        const: 'never'
                    }
                ],
                'prefer-const': 'error',
                'prefer-object-spread': 'error',
                'no-implicit-coercion': 'error',
                'no-loop-func': 'error',
                'quote-props': ['error', 'as-needed'],
                quotes: 'off',
                radix: 'off',
                'require-atomic-updates': 'error',
                'rest-spread-spacing': 'error',
                'space-before-blocks': 'error',
                'space-before-function-paren': [
                    'error',
                    {
                        named: 'never',
                        anonymous: 'ignore',
                        asyncArrow: 'always'
                    }
                ],
                'space-infix-ops': 'error',
                'spaced-comment': ['error', 'always', { exceptions: ['*'] }],
                'unicode-bom': 'error',
                'use-isnan': 'error',
                'valid-typeof': 'off',
                'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
                'func-style': 'off',
                'no-implicit-globals': 'error',
                'no-implied-eval': 'error',
                'no-unused-vars': 'off'
            }
        }
    ]
};
