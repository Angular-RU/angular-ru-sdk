/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['eslint-plugin-no-cyrillic-string'],
            rules: {
                'no-cyrillic-string/no-cyrillic-string': 'error'
            }
        }
    ]
};
