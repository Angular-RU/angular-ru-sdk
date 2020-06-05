/* eslint-disable */
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    settings: {
        'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
        'import/resolver': { 'eslint-import-resolver-typescript': true }
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        createDefaultProgram: true,
        project: './tsconfig.json',
        sourceType: 'module',
        errorOnUnknownASTType: true,
        errorOnTypeScriptSyntacticAndSemanticIssues: true
    },
    ignorePatterns: [
        '**/node_modules/**',
        '**/schematics/*',
        '**/coverage/**',
        'eslintrc.js',
        '.eslintrc.js',
        '**/*.spec.ts',
        '**/*-spec.ts',
        '**/*.lint.ts',
        '**/dist/**',
        '**/docs/**',
        '.cache/**',
        '.git/**',
        '.idea/**'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    plugins: [
        '@typescript-eslint',
        '@typescript-eslint/tslint',
        'prettier',
        'simple-import-sort',
        'eslint-plugin-no-cyrillic-string'
    ],
    rules: {
        indent: 'off',
        camelcase: 'error',
        'max-depth': ['error', 4],
        'no-unneeded-ternary': 'error',
        'require-atomic-updates': 'error',
        complexity: ['error', { max: 6 }],
        'id-match': [
            'error',
            '^[a-zA-Z_0-9$]*$',
            { properties: true, ignoreDestructuring: false, onlyDeclarations: false }
        ],
        'no-constant-condition': 'error',
        'no-negated-condition': 'error',
        'no-cyrillic-string/no-cyrillic-string': 'error',
        'max-lines-per-function': ['error', { max: 20, skipBlankLines: true, skipComments: true, IIFEs: true }],
        'max-nested-callbacks': ['error', 3],
        'no-return-assign': ['error', 'always'],
        'max-params': ['error', 3],
        'no-nested-ternary': 'error',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': [
            'error',
            {
                ignore: [-1, 0, 1],
                ignoreEnums: true,
                ignoreNumericLiteralTypes: true,
                ignoreReadonlyClassProperties: true
            }
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        'sort-imports': 'off',
        'prettier/prettier': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'simple-import-sort/sort': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                overrides: {
                    constructors: 'off'
                }
            }
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false,
                argsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'class',
                modifiers: ['abstract'],
                format: ['PascalCase'],
                prefix: ['Abstract']
            },
            {
                selector: 'enum',
                format: ['StrictPascalCase']
            }
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    // Index signature
                    'signature',

                    // Fields
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    'public-instance-field',
                    'public-abstract-field',
                    'protected-instance-field',
                    'protected-abstract-field',
                    'private-instance-field',
                    'private-abstract-field',

                    // Constructors
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',

                    // Methods
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',
                    'public-instance-method',
                    'public-abstract-method',
                    'protected-instance-method',
                    'protected-abstract-method',
                    'private-instance-method',
                    'private-abstract-method'
                ]
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/no-use-before-declare': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/prefer-readonly': ['error', { onlyInlineLambdas: true }],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
        'no-prototype-builtins': 'off',
        'no-useless-escape': 'off',
        quotes: 'off',
        '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],
        'arrow-body-style': 'error',
        'arrow-parens': ['error', 'always'],
        'constructor-super': 'error',
        curly: 'error',
        'dot-notation': 'off',
        'eol-last': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'max-classes-per-file': 'off',
        'max-len': [
            'error',
            {
                code: 120,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreComments: true
            }
        ],
        'new-parens': 'error',
        'no-bitwise': 'off',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': [
            'error',
            {
                allow: ['warn', 'error']
            }
        ],
        'no-debugger': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': 'off',
        'no-empty-functions': 'off',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-multiple-empty-lines': 'error',
        'no-new-wrappers': 'error',
        'no-sparse-arrays': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', { var: 'never', let: 'never', const: 'never' }],
        'prefer-arrow/prefer-arrow-functions': 'off',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'as-needed'],
        radix: 'off',
        'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
        'use-isnan': 'error',
        'valid-typeof': 'off',
        'no-restricted-syntax': [
            'error',
            {
                selector: 'TSEnumDeclaration:not([const=true])',
                message: "Don't declare non-const enums"
            }
        ],
        '@typescript-eslint/tslint/config': [
            'error',
            {
                rulesDirectory: [
                    `node_modules/codelyzer`,
                    `node_modules/tslint-sonarts/lib/rules`,
                    `node_modules/tslint-eslint-rules/dist/rules`
                ],
                rules: {
                    align: [true, 'parameters', 'statements'],
                    'bool-param-default': true,
                    'cognitive-complexity': true,
                    'comment-format': [true, 'check-space'],
                    'component-max-inline-declarations': true,
                    'consecutive-overloads': true,
                    'contextual-lifecycle': true,
                    encoding: true,
                    'import-destructuring-spacing': true,
                    'import-spacing': true,
                    'jsdoc-format': [true, 'check-multiline-start'],
                    'max-switch-cases': true,
                    'max-union-size': true,
                    'no-accessor-field-mismatch': true,
                    'no-all-duplicated-branches': true,
                    'no-alphabetical-sort': true,
                    'no-array-delete': true,
                    'no-big-function': false,
                    'no-case-with-or': true,
                    'no-collapsible-if': true,
                    'no-collection-size-mischeck': true,
                    'no-commented-code': true,
                    'no-dead-store': true,
                    'no-default-export': true,
                    'no-duplicate-in-composite': true,
                    'no-duplicate-string': false,
                    'no-duplicate-variable': true,
                    'no-duplicated-branches': true,
                    'no-element-overwrite': true,
                    'no-empty-array': true,
                    'no-empty-destructuring': true,
                    'no-extra-semicolon': true,
                    'no-gratuitous-expressions': true,
                    'no-hardcoded-credentials': true,
                    'no-host-metadata-property': true,
                    'no-identical-conditions': true,
                    'no-identical-expressions': true,
                    'no-identical-functions': false,
                    'no-ignored-initial-value': true,
                    'no-ignored-return': true,
                    'no-in-misuse': true,
                    'no-inputs-metadata-property': true,
                    'no-invalid-await': true,
                    'no-invariant-return': true,
                    'no-inverted-boolean-check': true,
                    'no-misleading-array-reverse': true,
                    'no-misspelled-operator': true,
                    'no-multiline-string-literals': true,
                    'no-nested-switch': true,
                    'no-nested-template-literals': true,
                    'no-outputs-metadata-property': true,
                    'no-redundant-boolean': true,
                    'no-redundant-jump': true,
                    'no-redundant-parentheses': true,
                    'no-reference-import': true,
                    'no-return-type-any': true,
                    'no-same-line-conditional': true,
                    'no-self-assignment': true,
                    'no-shadowed-variable': true,
                    'no-small-switch': true,
                    'no-statements-same-line': true,
                    'no-try-promise': true,
                    'no-unconditional-jump': true,
                    'no-undefined-argument': true,
                    'no-unenclosed-multiline-block': true,
                    'no-unthrown-error': true,
                    'no-unused-array': true,
                    'no-unused-css': true,
                    'no-unused-expression': [true, 'allow-fast-null-checks'],
                    'no-use-of-empty-return-value': true,
                    'no-useless-cast': true,
                    'no-useless-catch': true,
                    'no-useless-increment': true,
                    'no-useless-intersection': true,
                    'no-variable-usage-before-declaration': true,
                    'object-curly-spacing': [true, 'always'],
                    'one-line': [true, 'check-open-brace', 'check-catch', 'check-else', 'check-whitespace'],
                    'parameters-max-number': true,
                    'prefer-default-last': true,
                    'prefer-immediate-return': true,
                    'prefer-optional': true,
                    'prefer-promise-shorthand': true,
                    'prefer-type-guard': true,
                    semicolon: [true, 'always', 'strict-bound-class-methods'],
                    'template-conditional-complexity': [true, 4],
                    'template-no-negated-async': true,
                    'trailing-comma': [
                        true,
                        {
                            multiline: 'never',
                            singleline: 'never',
                            esSpecCompliant: true
                        }
                    ],
                    typedef: [
                        true,
                        'call-signature',
                        'arrow-call-signature',
                        'parameter',
                        'arrow-parameter',
                        'property-declaration',
                        'variable-declaration',
                        'member-variable-declaration',
                        'object-destructuring',
                        'array-destructuring'
                    ],
                    'use-component-selector': true,
                    'use-lifecycle-interface': true,
                    'use-pipe-transform-interface': true,
                    'use-primitive-type': true,
                    'use-type-alias': true,
                    whitespace: [
                        true,
                        'check-branch',
                        'check-decl',
                        'check-operator',
                        'check-module',
                        'check-separator',
                        'check-rest-spread',
                        'check-type',
                        'check-typecast',
                        'check-type-operator',
                        'check-preblock'
                    ]
                }
            }
        ]
    }
};
