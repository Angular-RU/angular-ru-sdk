/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            plugins: ['@typescript-eslint'],
            rules: {
                '@typescript-eslint/no-extraneous-class': [
                    'error',
                    {
                        allowConstructorOnly: true,
                        allowEmpty: false,
                        allowStaticOnly: true,
                        allowWithDecorator: true
                    }
                ]
            }
        },
        {
            files: ['*.spec.ts', '*.fixture.ts'],
            plugins: ['@typescript-eslint'],
            rules: {
                '@typescript-eslint/no-extraneous-class': 'off'
            }
        }
    ]
};
