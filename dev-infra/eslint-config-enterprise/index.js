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
    ],
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                createDefaultProgram: true,
                project: './tsconfig.json',
                sourceType: 'module',
                errorOnUnknownASTType: true,
                errorOnTypeScriptSyntacticAndSemanticIssues: true,
                warnOnUnsupportedTypeScriptVersion: false
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:import/warnings',
                'plugin:import/typescript',
                'plugin:json/recommended'
            ],
            plugins: [
                'decorator-position',
                'prettier',
                'simple-import-sort',
                'max-params-no-constructor',
                'eslint-plugin-no-cyrillic-string',
                'eslint-plugin-jsdoc',
                'eslint-plugin-import',
                '@typescript-eslint',
                'sonarjs',
                '@angular-eslint/eslint-plugin',
                '@angular-ru/eslint-plugin-enterprise',
                'json'
            ],
            rules: {
                'decorator-position/decorator-position': [
                    'error',
                    {
                        printWidth: 120,
                        properties: 'prefer-inline',
                        methods: 'above'
                    }
                ],

                /**
                 * ESLint Core
                 */
                'padding-line-between-statements': [
                    'error',
                    { blankLine: 'always', prev: '*', next: 'block' },
                    { blankLine: 'always', prev: 'block', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'block-like' },
                    { blankLine: 'always', prev: 'block-like', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'return' },
                    { blankLine: 'always', prev: 'directive', next: '*' },
                    { blankLine: 'any', prev: 'directive', next: 'directive' },
                    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                    { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
                ],
                'no-invalid-this': 'off',
                'arrow-body-style': 'error',
                'arrow-parens': ['error', 'always'],
                'brace-style': [
                    // Note: after prettier 2.3+ we have collisions with current rules
                    'off'
                ],
                'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
                camelcase: 'off',
                'comma-dangle': ['error', 'never'],
                'comma-spacing': ['error', { before: false, after: true }],
                complexity: ['error', { max: 6 }],
                'constructor-super': 'error',
                curly: 'error',
                'dot-notation': 'off',
                'eol-last': 'error',
                eqeqeq: ['error', 'smart'],
                'guard-for-in': 'error',
                'id-match': [
                    'error',
                    '^[a-zA-Z_0-9$]*$',
                    {
                        properties: true,
                        ignoreDestructuring: false,
                        onlyDeclarations: false
                    }
                ],
                indent: 'off',
                'keyword-spacing': ['error', { before: true }],
                'max-classes-per-file': ['error', 1],
                'max-depth': ['error', 4],
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
                'max-lines-per-function': [
                    'error',
                    {
                        max: 20,
                        skipBlankLines: true,
                        skipComments: true,
                        IIFEs: true
                    }
                ],
                'max-nested-callbacks': ['error', 3],
                'max-params': 'off',
                'new-parens': 'error',
                'no-bitwise': 'off',
                'no-caller': 'error',
                'no-cond-assign': 'error',
                'no-console': ['error', { allow: ['warn', 'error'] }],
                'no-param-reassign': ['error'],
                'no-constant-condition': 'error',
                'no-debugger': 'error',
                'no-duplicate-imports': 'error',
                'no-empty': 'off',
                'no-empty-functions': 'off',
                'no-eval': 'error',
                'no-fallthrough': 'error',
                'no-magic-numbers': 'off',
                'no-unmodified-loop-condition': 'error',
                'no-multiple-empty-lines': 'error',
                'no-negated-condition': 'error',
                'no-nested-ternary': 'error',
                'no-new-wrappers': 'error',
                'no-prototype-builtins': 'off',
                'import/exports-last': 'off',
                'import/newline-after-import': ['error', { count: 1 }],
                'no-redeclare': 'off',
                '@typescript-eslint/no-redeclare': ['error'],
                'no-restricted-exports': ['error'],
                'no-restricted-syntax': [
                    'error',
                    {
                        selector: 'TSEnumDeclaration:not([const=true])',
                        message: "Don't declare non-const enums"
                    },
                    {
                        selector: 'MethodDefinition[static = true] ThisExpression',
                        message: "Don't use this in static methods"
                    }
                ],
                'no-return-assign': ['error', 'always'],
                'no-self-assign': 'error',
                'no-shadow': 'off',
                'no-sparse-arrays': 'error',
                'no-throw-literal': 'error',
                'no-trailing-spaces': 'error',
                'no-undef-init': 'error',
                'no-unneeded-ternary': 'error',
                'no-unsafe-finally': 'error',
                'no-unused-expressions': 'error',
                'no-unused-labels': 'error',
                'no-useless-constructor': 'off',
                'no-useless-escape': 'off',
                'no-var': 'error',
                'object-curly-spacing': ['error', 'always'],
                'object-shorthand': 'error',
                'one-var': [
                    'error',
                    {
                        var: 'never',
                        let: 'never',
                        const: 'never'
                    }
                ],
                'prefer-const': 'error',
                'prefer-object-spread': 'error',
                'no-implicit-coercion': 'error',
                'no-loop-func': 'error',
                'quote-props': ['error', 'as-needed'],
                quotes: 'off',
                radix: 'off',
                'require-atomic-updates': 'error',
                'rest-spread-spacing': 'error',
                'sort-imports': 'off',
                'space-before-blocks': 'error',
                'space-before-function-paren': [
                    'error',
                    {
                        named: 'never',
                        anonymous: 'ignore',
                        asyncArrow: 'always'
                    }
                ],
                'space-infix-ops': 'error',
                'spaced-comment': ['error', 'always', { exceptions: ['*'] }],
                'unicode-bom': 'error',
                'use-isnan': 'error',
                'valid-typeof': 'off',
                'no-dupe-class-members': 'off',

                /**
                 * prettier
                 */
                'prettier/prettier': 'error',

                /**
                 * simple-import-sort
                 */
                'simple-import-sort/imports': 'error',
                'simple-import-sort/exports': 'error',

                /**
                 * max-params-no-constructor
                 */
                'max-params-no-constructor/max-params-no-constructor': ['error', 3],

                /**
                 * no-cyrillic-string
                 */
                'no-cyrillic-string/no-cyrillic-string': 'error',

                /**
                 * jsdoc
                 */
                'jsdoc/check-alignment': 'error',

                /**
                 * import
                 */
                'import/first': 'error',
                'import/no-default-export': 'error',
                'import/no-duplicates': 'error',
                'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
                'func-style': 'off',
                'no-implicit-globals': 'error',

                /**
                 * @typescript-eslint
                 */
                '@typescript-eslint/no-dynamic-delete': 'off',
                '@typescript-eslint/dot-notation': 'error',
                '@typescript-eslint/strict-boolean-expressions': 'error',
                '@typescript-eslint/no-invalid-this': ['error'],
                '@typescript-eslint/no-dupe-class-members': ['error'],
                '@typescript-eslint/adjacent-overload-signatures': 'error',
                '@typescript-eslint/array-type': 'error',
                '@typescript-eslint/ban-ts-ignore': 'off',
                '@typescript-eslint/ban-types': 'error',
                '@typescript-eslint/consistent-type-assertions': 'error',
                '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
                '@typescript-eslint/explicit-function-return-type': [
                    'error',
                    {
                        allowExpressions: false,
                        allowTypedFunctionExpressions: false,
                        allowHigherOrderFunctions: true,
                        allowDirectConstAssertionInArrowFunctions: true,
                        allowConciseArrowFunctionExpressionsStartingWithVoid: true
                    }
                ],
                '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: 'off' } }],
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: [
                            'signature',
                            'public-static-field',
                            'protected-static-field',
                            'private-static-field',
                            'public-decorated-field',
                            'public-instance-field',
                            'public-abstract-field',
                            'protected-decorated-field',
                            'protected-instance-field',
                            'protected-abstract-field',
                            'private-decorated-field',
                            'private-instance-field',
                            'private-abstract-field',
                            'public-constructor',
                            'protected-constructor',
                            'private-constructor',
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
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'class',
                        format: ['PascalCase']
                    },
                    {
                        selector: 'interface',
                        format: ['PascalCase']
                    },
                    {
                        selector: 'variable',
                        format: ['camelCase', 'UPPER_CASE']
                    },
                    {
                        selector: 'typeLike',
                        format: ['PascalCase']
                    },
                    {
                        selector: 'class',
                        modifiers: ['abstract'],
                        format: ['PascalCase'],
                        prefix: ['Abstract']
                    },
                    {
                        selector: 'enum',
                        format: ['StrictPascalCase']
                    },
                    {
                        selector: 'enumMember',
                        format: ['PascalCase', 'UPPER_CASE']
                    }
                ],
                '@typescript-eslint/no-empty-interface': 'error',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/no-inferrable-types': 'off',
                '@typescript-eslint/no-magic-numbers': [
                    'error',
                    {
                        ignore: [-1, 0, 1],
                        ignoreEnums: true,
                        ignoreNumericLiteralTypes: true,
                        ignoreReadonlyClassProperties: true
                    }
                ],
                '@typescript-eslint/no-misused-new': 'error',
                '@typescript-eslint/no-misused-promises': [
                    'error',
                    {
                        checksConditionals: true,
                        checksVoidReturn: false
                    }
                ],
                '@typescript-eslint/no-namespace': 'error',
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/no-parameter-properties': 'off',
                '@typescript-eslint/no-require-imports': 'off',
                '@typescript-eslint/no-shadow': ['error'],
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        vars: 'all',
                        args: 'after-used',
                        ignoreRestSiblings: false,
                        argsIgnorePattern: '^_'
                    }
                ],
                '@typescript-eslint/no-use-before-declare': 'off',
                '@typescript-eslint/no-use-before-define': [
                    'error',
                    {
                        functions: false,
                        classes: false,
                        variables: true
                    }
                ],
                '@typescript-eslint/no-useless-constructor': ['error'],
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/prefer-for-of': 'off',
                '@typescript-eslint/prefer-function-type': 'error',
                '@typescript-eslint/prefer-namespace-keyword': 'error',
                '@typescript-eslint/prefer-readonly': [
                    'error',
                    {
                        onlyInlineLambdas: true
                    }
                ],
                '@typescript-eslint/quotes': [
                    'error',
                    'single',
                    {
                        allowTemplateLiterals: true
                    }
                ],
                '@typescript-eslint/semi': ['error', 'always'],
                '@typescript-eslint/triple-slash-reference': 'error',
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/typedef': [
                    'error',
                    {
                        parameter: true,
                        arrowParameter: true,
                        propertyDeclaration: true,
                        variableDeclaration: true,
                        memberVariableDeclaration: true,
                        objectDestructuring: true,
                        arrayDestructuring: true,
                        variableDeclarationIgnoreFunction: true
                    }
                ],
                '@typescript-eslint/unified-signatures': 'error',

                /**
                 * sonarjs
                 */
                'sonarjs/cognitive-complexity': 'error',
                'sonarjs/max-switch-cases': 'error',
                'sonarjs/no-all-duplicated-branches': 'error',
                'sonarjs/no-big-function': 'off',
                'sonarjs/no-collapsible-if': 'error',
                'sonarjs/no-collection-size-mischeck': 'error',
                'sonarjs/no-duplicate-string': 'off',
                'sonarjs/no-duplicated-branches': 'error',
                'sonarjs/no-element-overwrite': 'error',
                'sonarjs/no-identical-conditions': 'error',
                'sonarjs/no-identical-expressions': 'error',
                'sonarjs/no-identical-functions': 'off',
                'sonarjs/no-inverted-boolean-check': 'error',
                'sonarjs/no-one-iteration-loop': 'error',
                'sonarjs/no-redundant-boolean': 'error',
                'sonarjs/no-redundant-jump': 'error',
                'sonarjs/no-same-line-conditional': 'error',
                'sonarjs/no-small-switch': 'error',
                'sonarjs/no-unused-collection': 'error',
                'sonarjs/no-use-of-empty-return-value': 'error',
                'sonarjs/no-useless-catch': 'error',
                'sonarjs/prefer-immediate-return': 'error',
                /**
                 * not implemented yet
                 */
                // 'sonarjs/bool-param-default': 'error',
                // 'sonarjs/comma-or-logical-or-case': 'error',
                // 'sonarjs/max-union-size': 'error',
                // 'sonarjs/no-accessor-field-mismatch': 'error',
                // 'sonarjs/no-alphabetical-sort': 'error',
                // 'sonarjs/no-array-delete': 'error',
                // 'sonarjs/no-commented-code': 'error',
                // 'sonarjs/no-dead-store': 'error',
                // 'sonarjs/no-duplicate-in-composite': 'error',
                // 'sonarjs/no-empty-collection': 'error',
                // 'sonarjs/no-gratuitous-expressions': 'error',
                // 'sonarjs/no-hardcoded-credentials': 'error',
                // 'sonarjs/no-ignored-return': 'error',
                // 'sonarjs/no-in-misuse': 'error',
                // 'sonarjs/no-invalid-await': 'error',
                // 'sonarjs/no-invariant-returns': 'error',
                // 'sonarjs/no-misleading-array-reverse': 'error',
                // 'sonarjs/no-nested-switch': 'error',
                // 'sonarjs/no-nested-template-literals': 'error',
                // 'sonarjs/no-parameter-reassignment': 'error',
                // 'sonarjs/no-primitive-wrappers': 'error',
                // 'sonarjs/no-redundant-optional': 'error',
                // 'sonarjs/no-redundant-parentheses': 'error',
                // 'sonarjs/no-return-type-any': 'error',
                // 'sonarjs/no-try-promise': 'error',
                // 'sonarjs/no-undefined-argument': 'error',
                // 'sonarjs/no-unenclosed-multiline-block': 'error',
                // 'sonarjs/no-unthrown-error': 'error',
                // 'sonarjs/no-useless-increment': 'error',
                // 'sonarjs/no-useless-intersection': 'error',
                // 'sonarjs/no-variable-usage-before-declaration': 'error',
                // 'sonarjs/non-existent-operator': 'error',
                // 'sonarjs/parameters-max-number': 'error',
                // 'sonarjs/prefer-default-last': 'error',
                // 'sonarjs/prefer-promise-shorthand': 'error',
                // 'sonarjs/prefer-type-guard': 'error',
                // 'sonarjs/use-type-alias': 'error',

                /**
                 * @angular-eslint
                 */
                '@angular-eslint/component-class-suffix': 'error',
                '@angular-eslint/component-max-inline-declarations': 'error',
                '@angular-eslint/component-selector': 'error',
                '@angular-eslint/contextual-decorator': 'error',
                '@angular-eslint/contextual-lifecycle': 'error',
                '@angular-eslint/directive-class-suffix': 'error',
                '@angular-eslint/directive-selector': 'error',
                '@angular-eslint/no-attribute-decorator': 'error',
                '@angular-eslint/no-conflicting-lifecycle': 'error',
                '@angular-eslint/no-empty-lifecycle-method': 'error',
                '@angular-eslint/no-forward-ref': 'error',
                '@angular-eslint/no-host-metadata-property': 'error',
                '@angular-eslint/no-input-prefix': 'error',
                '@angular-eslint/no-input-rename': 'error',
                '@angular-eslint/no-inputs-metadata-property': 'error',
                '@angular-eslint/no-lifecycle-call': 'error',
                '@angular-eslint/no-output-native': 'error',
                '@angular-eslint/no-output-on-prefix': 'error',
                '@angular-eslint/no-output-rename': 'off',
                '@angular-eslint/no-outputs-metadata-property': 'error',
                '@angular-eslint/no-pipe-impure': 'error',
                '@angular-eslint/no-queries-metadata-property': 'error',
                '@angular-eslint/pipe-prefix': 'error',
                '@angular-eslint/prefer-on-push-component-change-detection': 'error',
                '@angular-eslint/prefer-output-readonly': 'error',
                '@angular-eslint/relative-url-prefix': 'error',
                '@angular-eslint/sort-ngmodule-metadata-arrays': 'off',
                '@angular-eslint/use-component-selector': 'error',
                '@angular-eslint/use-component-view-encapsulation': 'off',
                '@angular-eslint/use-injectable-provided-in': 'off',
                '@angular-eslint/use-lifecycle-interface': 'error',
                '@angular-eslint/use-pipe-transform-interface': 'error',

                /**
                 * Angular-RU rules
                 */
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
        },
        {
            files: ['*.spec.ts'], // light version rules for test files
            extends: ['plugin:jest/style', 'plugin:jest/all', 'plugin:mocha/recommended'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                'max-lines-per-function': 'off',
                '@typescript-eslint/no-magic-numbers': 'off',
                'max-classes-per-file': 'off',
                '@typescript-eslint/typedef': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                'max-nested-callbacks': 'off',
                '@angular-eslint/prefer-on-push-component-change-detection': 'off',
                '@angular-eslint/component-max-inline-declarations': 'off',
                '@angular-eslint/use-component-selector': 'off',

                // jest
                'jest/expect-expect': 'error',
                'jest/no-disabled-tests': 'error',
                'jest/no-jasmine-globals': 'off',
                'jest/prefer-strict-equal': 'off',
                'jest/no-hooks': 'off',
                'jest/unbound-method': 'off',
                'jest/prefer-expect-assertions': 'off',

                // mocha
                'mocha/no-mocha-arrows': 'off',
                'mocha/no-setup-in-describe': 'off',
                'mocha/no-hooks-for-single-case': 'off',
                'mocha/prefer-arrow-callback': 'error'
            }
        },
        {
            files: ['*.component.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {
                'max-len': 'off',
                '@angular-eslint/template/accessibility-alt-text': 'error',
                '@angular-eslint/template/accessibility-elements-content': 'error',
                '@angular-eslint/template/accessibility-label-for': 'error',
                '@angular-eslint/template/accessibility-label-has-associated-control': 'error',
                '@angular-eslint/template/accessibility-table-scope': 'error',
                '@angular-eslint/template/accessibility-valid-aria': 'error',
                '@angular-eslint/template/banana-in-box': 'error',
                '@angular-eslint/template/click-events-have-key-events': 'off',
                '@angular-eslint/template/conditional-complexity': 'off',
                '@angular-eslint/template/cyclomatic-complexity': 'off',
                '@angular-eslint/template/eqeqeq': 'error',
                '@angular-eslint/template/i18n': 'off',
                '@angular-eslint/template/mouse-events-have-key-events': 'error',
                '@angular-eslint/template/no-any': 'off',
                '@angular-eslint/template/no-autofocus': 'error',
                '@angular-eslint/template/no-call-expression': 'error',
                '@angular-eslint/template/no-distracting-elements': 'error',
                '@angular-eslint/template/no-duplicate-attributes': 'error',
                '@angular-eslint/template/no-negated-async': 'error',
                '@angular-eslint/template/no-positive-tabindex': 'error',
                '@angular-eslint/template/use-track-by-function': 'off'
            }
        },
        {
            files: ['*.component.ts'],
            extends: ['plugin:@angular-eslint/template/process-inline-templates']
        },
        {
            files: ['*.json'],
            extends: ['plugin:json/recommended'],
            plugins: ['json'],
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
