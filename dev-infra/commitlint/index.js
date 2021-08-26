module.exports = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-angular'],
    rules: {
        'header-max-length': [2, 'always', 100],
        'subject-case': [0],
        'scope-enum': [0],
        'type-enum': [
            2,
            /**
             * feat: (new feature for the user, not a new feature for build script)
             * fix: (bug fix for the user, not a fix to a build script)
             * docs: (changes to the documentation)
             * ci: (update ci jobs)
             * build: (changes for build pipeline)
             * style: (formatting, missing semi colons, etc; no production code change)
             * refactor: (refactoring production code, eg. renaming a variable)
             * test: (adding missing tests, refactoring tests; no production code change)
             * chore: (no production code change)
             */
            'always',
            ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'chore']
        ]
    }
};
