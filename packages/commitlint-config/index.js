module.exports = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-angular'],
    rules: {
        'header-max-length': [2, 'always', 100],
        'subject-case': [0]
    }
};
