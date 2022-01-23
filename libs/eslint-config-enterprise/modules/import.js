/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'simple-import-sort', 'eslint-plugin-import'],
            settings: {
                'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
                'import/resolver': { 'eslint-import-resolver-typescript': true }
            },
            extends: ['plugin:import/warnings', 'plugin:import/typescript'],
            rules: {
                'sort-imports': 'off',
                'simple-import-sort/imports': 'error',
                'simple-import-sort/exports': 'error',
                'import/first': 'error',
                'import/no-default-export': 'error',
                'import/exports-last': 'off',
                'import/newline-after-import': ['error', { count: 1 }],
                'import/no-webpack-loader-syntax': 'error',
                'import/no-duplicates': 'off',
                'no-duplicate-imports': 'off',
                'no-case-declarations': 'error',
                '@typescript-eslint/no-duplicate-imports': 'error',
                '@typescript-eslint/no-require-imports': 'off'
            }
        }
    ]
};
