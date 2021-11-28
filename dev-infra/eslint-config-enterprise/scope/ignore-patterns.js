/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    ignorePatterns: [
        'dist',
        'node_modules',
        '**/node_modules/**',
        '**/schematics/*',
        '**/coverage/**',
        'eslintrc.js',
        '.eslintrc.js',
        '**/*.d.ts',
        '**/dist/**',
        '**/docs/**',
        '.cache/**',
        '.git/**',
        '.idea/**'
    ]
};
