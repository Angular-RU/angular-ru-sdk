/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.spec.ts'], // light version rules for test files
            extends: ['plugin:jest/style', 'plugin:jest/all', 'plugin:mocha/recommended'],
            rules: {
                // base
                '@typescript-eslint/no-extraneous-class': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/typedef': 'off',
                '@typescript-eslint/no-magic-numbers': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',

                // eslint
                'max-lines-per-function': 'off',
                'max-classes-per-file': 'off',
                'max-nested-callbacks': 'off',

                // jest
                'jest/expect-expect': 'error',
                'jest/no-disabled-tests': 'error',
                'jest/no-jasmine-globals': 'off',
                'jest/prefer-strict-equal': 'off',
                'jest/no-hooks': 'off',
                'jest/unbound-method': 'off',
                'jest/prefer-expect-assertions': 'off',
                'jest/no-conditional-in-test': 'off',
                'jest/require-hook': 'off',

                // mocha
                'mocha/no-mocha-arrows': 'off',
                'mocha/no-setup-in-describe': 'off',
                'mocha/no-hooks-for-single-case': 'off',
                'mocha/prefer-arrow-callback': 'error'
            }
        }
    ]
};
