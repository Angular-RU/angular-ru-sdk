/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@angular-ru/eslint-plugin-enterprise'],
            rules: {
                '@angular-ru/enterprise/no-suffix-file': [
                    'error',
                    {
                        fileEndsWithList: [
                            '.model.ts',
                            '.models.ts',
                            '.enum.ts',
                            '.enums.ts',
                            '.type.ts',
                            '.types.ts',
                            '.interface.ts',
                            '.interfaces.ts'
                        ]
                    }
                ]
            }
        }
    ]
};
