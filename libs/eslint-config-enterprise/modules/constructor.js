/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['max-params-no-constructor'],
            rules: {
                'constructor-super': 'error',
                'no-useless-constructor': 'off',
                'max-params-no-constructor/max-params-no-constructor': ['error', 3],
                '@typescript-eslint/no-useless-constructor': ['error']
            }
        }
    ]
};
