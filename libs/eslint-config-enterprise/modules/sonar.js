/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['sonarjs'],
            rules: {
                'sonarjs/cognitive-complexity': 'error',
                'sonarjs/max-switch-cases': 'error',
                'sonarjs/no-all-duplicated-branches': 'error',
                'sonarjs/no-big-function': 'off',
                'sonarjs/no-collapsible-if': 'error',
                'sonarjs/no-collection-size-mischeck': 'error',
                'sonarjs/no-duplicate-string': 'off',
                'sonarjs/no-duplicated-branches': 'error',
                'sonarjs/no-element-overwrite': 'error',
                'sonarjs/no-identical-conditions': 'error',
                'sonarjs/no-identical-expressions': 'error',
                'sonarjs/no-identical-functions': 'off',
                'sonarjs/no-inverted-boolean-check': 'error',
                'sonarjs/no-one-iteration-loop': 'error',
                'sonarjs/no-redundant-boolean': 'error',
                'sonarjs/no-redundant-jump': 'error',
                'sonarjs/no-same-line-conditional': 'error',
                'sonarjs/no-small-switch': 'error',
                'sonarjs/no-unused-collection': 'error',
                'sonarjs/no-use-of-empty-return-value': 'error',
                'sonarjs/no-useless-catch': 'error',
                'sonarjs/prefer-immediate-return': 'error',
                'sonarjs/no-empty-collection': 'error',
                'sonarjs/no-gratuitous-expressions': 'error',
                'sonarjs/no-ignored-return': 'error',
                'sonarjs/no-nested-switch': 'error',
                'sonarjs/no-nested-template-literals': 'error',
                'sonarjs/non-existent-operator': 'error'
            }
        }
    ]
};
