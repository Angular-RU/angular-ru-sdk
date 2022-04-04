/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    extends: [
        './modules/base-eslint.js',
        './modules/base-typescript.js',
        './modules/import.js',
        './modules/ignore-patterns.js',
        './modules/spell-check.js',
        './modules/deprecation.js',
        './modules/json.js',
        './modules/jsdoc.js',
        './modules/rxjs.js',
        './modules/prettier.js',
        './modules/sonar.js',
        './modules/member-ordering.js',
        './modules/html.js',
        './modules/angular-eslint.js',
        './modules/angular-ru.js',
        './modules/line-statements.js',
        './modules/spec.js',
        './modules/constructor.js',
        './modules/no-cyrillic.js',
        './modules/no-extraneous-class.js',
        './modules/rxjs-angular.js',
        './modules/unicorn.js'
    ]
};
