/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['eslint-plugin-jsdoc'],
            rules: { 'jsdoc/check-alignment': 'error' }
        }
    ]
};
