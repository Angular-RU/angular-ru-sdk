/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['decorator-position'],
            rules: {
                'decorator-position/decorator-position': [
                    'error',
                    {
                        printWidth: 120,
                        properties: 'prefer-inline',
                        methods: 'above'
                    }
                ]
            }
        }
    ]
};
