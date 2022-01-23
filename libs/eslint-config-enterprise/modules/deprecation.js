/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['deprecation'],
            rules: { 'deprecation/deprecation': 'error' }
        }
    ]
};
