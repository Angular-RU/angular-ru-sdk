/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@angular-eslint/eslint-plugin'],
            rules: {
                '@angular-eslint/component-class-suffix': 'error',
                '@angular-eslint/component-max-inline-declarations': 'error',
                '@angular-eslint/component-selector': 'error',
                '@angular-eslint/contextual-decorator': 'error',
                '@angular-eslint/contextual-lifecycle': 'error',
                '@angular-eslint/directive-class-suffix': 'error',
                '@angular-eslint/directive-selector': 'error',
                '@angular-eslint/no-attribute-decorator': 'error',
                '@angular-eslint/no-conflicting-lifecycle': 'error',
                '@angular-eslint/no-empty-lifecycle-method': 'error',
                '@angular-eslint/no-forward-ref': 'error',
                '@angular-eslint/no-host-metadata-property': 'error',
                '@angular-eslint/no-input-prefix': 'error',
                '@angular-eslint/no-input-rename': 'error',
                '@angular-eslint/no-inputs-metadata-property': 'error',
                '@angular-eslint/no-lifecycle-call': 'error',
                '@angular-eslint/no-output-native': 'error',
                '@angular-eslint/no-output-on-prefix': 'error',
                '@angular-eslint/no-output-rename': 'off',
                '@angular-eslint/no-outputs-metadata-property': 'error',
                '@angular-eslint/no-pipe-impure': 'error',
                '@angular-eslint/no-queries-metadata-property': 'error',
                '@angular-eslint/pipe-prefix': 'error',
                '@angular-eslint/prefer-on-push-component-change-detection': 'error',
                '@angular-eslint/prefer-output-readonly': 'error',
                '@angular-eslint/relative-url-prefix': 'error',
                '@angular-eslint/sort-ngmodule-metadata-arrays': 'off',
                '@angular-eslint/use-component-selector': 'error',
                '@angular-eslint/use-component-view-encapsulation': 'off',
                '@angular-eslint/use-injectable-provided-in': 'off',
                '@angular-eslint/use-lifecycle-interface': 'error',
                '@angular-eslint/use-pipe-transform-interface': 'error'
            }
        },
        {
            files: ['*.component.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {
                'max-len': 'off',
                '@angular-eslint/template/accessibility-alt-text': 'error',
                '@angular-eslint/template/accessibility-elements-content': 'error',
                '@angular-eslint/template/accessibility-label-has-associated-control': 'error',
                '@angular-eslint/template/accessibility-table-scope': 'error',
                '@angular-eslint/template/accessibility-valid-aria': 'error',
                '@angular-eslint/template/banana-in-box': 'error',
                '@angular-eslint/template/click-events-have-key-events': 'off',
                '@angular-eslint/template/conditional-complexity': 'off',
                '@angular-eslint/template/cyclomatic-complexity': 'off',
                '@angular-eslint/template/eqeqeq': 'error',
                '@angular-eslint/template/i18n': 'off',
                '@angular-eslint/template/mouse-events-have-key-events': 'error',
                '@angular-eslint/template/no-any': 'off',
                '@angular-eslint/template/no-autofocus': 'error',
                '@angular-eslint/template/no-call-expression': 'error',
                '@angular-eslint/template/no-distracting-elements': 'error',
                '@angular-eslint/template/no-duplicate-attributes': 'error',
                '@angular-eslint/template/no-negated-async': 'error',
                '@angular-eslint/template/no-positive-tabindex': 'error',
                '@angular-eslint/template/use-track-by-function': 'off'
            }
        },
        {
            files: ['*.component.ts'],
            extends: ['plugin:@angular-eslint/template/process-inline-templates']
        },
        {
            files: ['*.spec.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@angular-eslint/eslint-plugin'],
            rules: {
                '@angular-eslint/prefer-on-push-component-change-detection': 'off',
                '@angular-eslint/component-max-inline-declarations': 'off',
                '@angular-eslint/use-component-selector': 'off'
            }
        }
    ]
};
