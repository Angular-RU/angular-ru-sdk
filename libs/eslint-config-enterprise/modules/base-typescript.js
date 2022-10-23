/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            parserOptions: {
                createDefaultProgram: true,
                project: './tsconfig*.json',
                sourceType: 'module',
                errorOnUnknownASTType: true,
                errorOnTypeScriptSyntacticAndSemanticIssues: true,
                warnOnUnsupportedTypeScriptVersion: false
            },
            extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
            rules: {
                '@typescript-eslint/no-redeclare': ['error'],
                '@typescript-eslint/no-implicit-any-catch': 'error',
                '@typescript-eslint/no-dynamic-delete': 'off',
                '@typescript-eslint/dot-notation': 'error',
                '@typescript-eslint/strict-boolean-expressions': 'off',
                '@typescript-eslint/no-invalid-this': ['error'],
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
                '@typescript-eslint/explicit-module-boundary-types': 'error',
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
                        format: ['camelCase', 'UPPER_CASE'],
                        filter: {
                            regex: '^(__dirname)$',
                            match: false
                        }
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
                '@typescript-eslint/no-explicit-any': 'off', // don't use, is redundant
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
                '@typescript-eslint/no-shadow': ['error'],
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
                '@typescript-eslint/unbound-method': [
                    'error',
                    {
                        ignoreStatic: true
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
                '@typescript-eslint/no-unnecessary-type-assertion': 'off'
            }
        }
    ]
};
