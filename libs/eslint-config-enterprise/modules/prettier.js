/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['prettier'],
            rules: {
                'prettier/prettier': 'error',
                'brace-style': ['off'] // Note: after prettier 2.3+ we have collisions with current rules
            }
        }
    ]
};
