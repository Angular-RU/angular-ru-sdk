/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.json'],
            extends: ['plugin:json/recommended'],
            plugins: ['prettier', 'json'],
            rules: {
                'json/*': ['error', { allowComments: true }]
            }
        },
        {
            files: ['**/i18n/**/*.json'],
            extends: ['plugin:i18n-json/recommended'],
            rules: {
                'i18n-json/valid-message-syntax': 0,
                'i18n-json/sorted-keys': [2, { indentSpaces: 4 }]
            }
        }
    ]
};
