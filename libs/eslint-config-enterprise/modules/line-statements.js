/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            plugins: ['@typescript-eslint'],
            rules: {
                'lines-around-comment': [
                    'error',
                    {
                        beforeBlockComment: false,
                        afterBlockComment: false,
                        beforeLineComment: false,
                        afterLineComment: false,
                        allowBlockStart: true,
                        allowBlockEnd: true,
                        allowObjectStart: true,
                        allowObjectEnd: true,
                        allowArrayStart: true,
                        allowArrayEnd: true,
                        allowClassStart: true,
                        allowClassEnd: true,
                        applyDefaultIgnorePatterns: true
                    }
                ],
                'lines-between-class-members': 'off',
                '@typescript-eslint/lines-between-class-members': [
                    'error',
                    'always',
                    { exceptAfterSingleLine: true, exceptAfterOverload: true }
                ],
                'padding-line-between-statements': 'off',
                '@typescript-eslint/padding-line-between-statements': [
                    'error',
                    { blankLine: 'always', prev: '*', next: 'block' },
                    { blankLine: 'always', prev: 'block', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'block-like' },
                    { blankLine: 'always', prev: 'block-like', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'return' },
                    { blankLine: 'always', prev: 'directive', next: '*' },
                    { blankLine: 'always', prev: '*', next: ['interface', 'type'] },
                    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                    {
                        blankLine: 'any',
                        prev: ['const', 'let', 'var', 'export'],
                        next: ['const', 'let', 'var', 'export']
                    },
                    { blankLine: 'any', prev: '*', next: ['case', 'default'] },
                    { blankLine: 'any', prev: ['case', 'default'], next: '*' },
                    { blankLine: 'any', prev: '*', next: 'class' },
                    { blankLine: 'any', prev: 'class', next: '*' },
                    { blankLine: 'any', prev: 'directive', next: 'directive' }
                ]
            }
        }
    ]
};
