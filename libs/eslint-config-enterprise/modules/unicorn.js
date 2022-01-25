/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['unicorn'],
            rules: {
                'unicorn/prevent-abbreviations': [
                    'error',
                    {
                        checkDefaultAndNamespaceImports: false,
                        ignore: [
                            /temp/i,
                            /param/i,
                            /params/i,
                            /dir/i,
                            /dirs/i,
                            /args/i,
                            /arg/i,
                            /arr/i,
                            /ctx/i,
                            /prop/i,
                            /fn/i,
                            /num/i,
                            /prev/i,
                            /str/i,
                            /ref/i,
                            /refs/i,
                            /idx/i,
                            /prod/i,
                            /^i$/i,
                            /^j$/i
                        ]
                    }
                ],
                'unicorn/better-regex': 'error',
                'unicorn/catch-error-name': 'error',
                'unicorn/consistent-destructuring': 'error',
                'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
                'unicorn/empty-brace-spaces': 'error',
                'unicorn/escape-case': 'error',
                'unicorn/error-message': 'error',
                'unicorn/explicit-length-check': 'error',
                'unicorn/filename-case': [
                    'error',
                    {
                        case: 'kebabCase',
                        ignore: ['^public_api.ts$']
                    }
                ],
                'unicorn/import-index': 'error',
                'unicorn/import-style': 'error',
                'unicorn/new-for-builtins': 'error',
                'unicorn/no-array-callback-reference': 'error',
                'unicorn/no-array-method-this-argument': 'error',
                'unicorn/prefer-code-point': 'error',
                'unicorn/prefer-date-now': 'error',
                'unicorn/prefer-default-parameters': 'error',
                'unicorn/no-array-for-each': 'error',
                'unicorn/no-array-push-push': 'error',
                'unicorn/no-await-expression-member': 'error',
                'unicorn/no-console-spaces': 'error',
                'unicorn/no-document-cookie': 'error',
                'unicorn/no-empty-file': 'error',
                'unicorn/no-for-loop': 'error',
                'unicorn/no-hex-escape': 'error',
                'unicorn/no-instanceof-array': 'error',
                'unicorn/no-invalid-remove-event-listener': 'error',
                'unicorn/no-nested-ternary': 'error',
                // TODO: enable later
                'unicorn/no-array-reduce': 'off',
                'unicorn/custom-error-definition': 'off',
                'unicorn/no-abusive-eslint-disable': 'off',
                'unicorn/expiring-todo-comments': 'off',
                'unicorn/no-unsafe-regex': 'off',
                'unicorn/no-lonely-if': 'error',
                'unicorn/no-keyword-prefix': 'off',
                'no-nested-ternary': 'off',
                'unicorn/no-unused-properties': 'off',
                'unicorn/prefer-at': 'off',
                'unicorn/prefer-string-replace-all': 'off',
                'unicorn/prefer-top-level-await': 'off',
                'unicorn/string-content': 'off',
                'unicorn/require-post-message-target-origin': 'off'
                /*












                'unicorn/no-new-array': 'error',
                'unicorn/no-new-buffer': 'error',
                'unicorn/no-null': 'error',
                'unicorn/no-object-as-default-parameter': 'error',
                'unicorn/no-process-exit': 'error',
                'unicorn/no-static-only-class': 'error',
                'unicorn/no-thenable': 'error',
                'unicorn/no-this-assignment': 'error',
                'unicorn/no-unreadable-array-destructuring': 'error',
                'unicorn/no-useless-fallback-in-spread': 'error',
                'unicorn/no-useless-length-check': 'error',
                'unicorn/no-useless-promise-resolve-reject': 'error',
                'unicorn/no-useless-spread': 'error',
                'unicorn/no-useless-undefined': 'error',
                'unicorn/no-zero-fractions': 'error',
                'unicorn/number-literal-case': 'error',
                'unicorn/numeric-separators-style': 'error',
                'unicorn/prefer-add-event-listener': 'error',
                'unicorn/prefer-array-find': 'error',
                'unicorn/prefer-array-flat': 'error',
                'unicorn/prefer-array-flat-map': 'error',
                'unicorn/prefer-array-index-of': 'error',
                'unicorn/prefer-array-some': 'error',
                'unicorn/prefer-dom-node-append': 'error',
                'unicorn/prefer-dom-node-dataset': 'error',
                'unicorn/prefer-dom-node-remove': 'error',
                'unicorn/prefer-dom-node-text-content': 'error',
                'unicorn/prefer-export-from': 'error',
                'unicorn/prefer-includes': 'error',
                'unicorn/prefer-json-parse-buffer': 'error',
                'unicorn/prefer-keyboard-event-key': 'error',
                'unicorn/prefer-math-trunc': 'error',
                'unicorn/prefer-modern-dom-apis': 'error',
                'unicorn/prefer-module': 'error',
                'unicorn/prefer-negative-index': 'error',
                'unicorn/prefer-node-protocol': 'error',
                'unicorn/prefer-number-properties': 'error',
                'unicorn/prefer-object-from-entries': 'error',
                'unicorn/prefer-optional-catch-binding': 'error',
                'unicorn/prefer-prototype-methods': 'error',
                'unicorn/prefer-query-selector': 'error',
                'unicorn/prefer-reflect-apply': 'error',
                'unicorn/prefer-regexp-test': 'error',
                'unicorn/prefer-set-has': 'error',
                'unicorn/prefer-spread': 'error',
                'unicorn/prefer-string-slice': 'error',
                'unicorn/prefer-string-starts-ends-with': 'error',
                'unicorn/prefer-string-trim-start-end': 'error',
                'unicorn/prefer-switch': 'error',
                'unicorn/prefer-ternary': 'error',
                'unicorn/prefer-type-error': 'error',
                'unicorn/relative-url-style': 'error',
                'unicorn/require-array-join-separator': 'error',
                'unicorn/require-number-to-fixed-digits-argument': 'error',
                'unicorn/template-indent': 'warn',
                'unicorn/throw-new-error': 'error'
                */
            }
        }
    ]
};
