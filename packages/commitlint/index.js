module.exports = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-angular'],
    rules: {
        'header-max-length': [2, 'always', 100],
        'subject-case': [0],
        'scope-enum': [2, 'never'],
        'type-enum': [
            2,
            'always',
            ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'chore']
        ]
    }
};
