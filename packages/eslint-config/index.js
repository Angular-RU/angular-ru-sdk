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
        '**/node_modules/**',
        '**/schematics/*',
        '**/coverage/**',
        'eslintrc.js',
        '.eslintrc.js',
        '**/*.spec.ts',
        '**/*-spec.ts',
        '**/*.lint.ts',
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
                errorOnTypeScriptSyntacticAndSemanticIssues: true
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:import/warnings',
                'plugin:import/typescript'
            ],
            plugins: [
                'prettier',
                'simple-import-sort',
                'max-params-no-constructor',
                'eslint-plugin-no-cyrillic-string',
                'eslint-plugin-jsdoc',
                'eslint-plugin-import',
                '@typescript-eslint',
                '@angular-eslint/eslint-plugin',
                'sonarjs'
            ],
            rules: {
                /**
                 * ESLint Core
                 */
                'arrow-body-style': 'error',
                'arrow-parens': ['error', 'always'],
                'brace-style': ['error', '1tbs'],
                camelcase: 'off',
                'comma-dangle': ['error', 'never'],
                'comma-spacing': [
                    'error',
                    {
                        before: false,
                        after: true
                    }
                ],
                complexity: [
                    'error',
                    {
                        max: 6
                    }
                ],
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
                'keyword-spacing': [
                    'error',
                    {
                        before: true
                    }
                ],
                'max-classes-per-file': 'off',
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
                'no-console': [
                    'error',
                    {
                        allow: ['warn', 'error']
                    }
                ],
                'no-param-reassign': ['error'],
                'no-constant-condition': 'error',
                'no-debugger': 'error',
                'no-duplicate-imports': 'error',
                'no-empty': 'off',
                'no-empty-functions': 'off',
                'no-eval': 'error',
                'no-fallthrough': 'error',
                'no-invalid-this': 'off',
                'no-magic-numbers': 'off',
                'no-multiple-empty-lines': 'error',
                'no-negated-condition': 'error',
                'no-nested-ternary': 'error',
                'no-new-wrappers': 'error',
                'no-prototype-builtins': 'off',
                'no-redeclare': 'error',
                'no-restricted-syntax': [
                    'error',
                    {
                        selector: 'TSEnumDeclaration:not([const=true])',
                        message: "Don't declare non-const enums"
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
                'spaced-comment': [
                    'error',
                    'always',
                    {
                        exceptions: ['*']
                    }
                ],
                'unicode-bom': 'error',
                'use-isnan': 'error',
                'valid-typeof': 'off',

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

                /**
                 * @typescript-eslint
                 */
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
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                    {
                        overrides: {
                            constructors: 'off'
                        }
                    }
                ],
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: [
                            'signature',
                            'public-static-field',
                            'protected-static-field',
                            'private-static-field',
                            'public-instance-field',
                            'public-abstract-field',
                            'protected-instance-field',
                            'protected-abstract-field',
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
                '@typescript-eslint/no-namespace': 'error',
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/no-parameter-properties': 'off',
                '@typescript-eslint/no-require-imports': 'off',
                '@typescript-eslint/no-shadow': ['error'],
                'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
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
                 * @angular-eslint
                 */
                '@angular-eslint/component-max-inline-declarations': 'error',
                '@angular-eslint/contextual-lifecycle': 'error',
                '@angular-eslint/no-host-metadata-property': 'error',
                '@angular-eslint/no-inputs-metadata-property': 'error',
                '@angular-eslint/no-outputs-metadata-property': 'error',
                '@angular-eslint/use-component-selector': 'error',
                '@angular-eslint/use-lifecycle-interface': 'error',
                '@angular-eslint/use-pipe-transform-interface': 'error',

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
                'sonarjs/prefer-immediate-return': 'error'

                /**
                 * not implemented yet
                 */
                // '@angular-eslint/no-unused-css': 'error',
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
                // 'sonarjs/use-type-alias': 'error'
            }
        },
        {
            files: ['*.component.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {
                '@angular-eslint/template/no-negated-async': 'error',
                'max-len': ['error', { code: 140 }]
            }
        },
        {
            files: ['*.component.ts'],
            extends: ['plugin:@angular-eslint/template/process-inline-templates']
        }
    ]
};
