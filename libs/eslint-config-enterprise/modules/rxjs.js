/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['rxjs'],
            extends: ['plugin:rxjs/recommended'],
            rules: {
                /**
                 * RxJS
                 */
                'rxjs/ban-observables': 'error',
                'rxjs/ban-operators': 'error',
                'rxjs/no-finnish': 'off',
                'rxjs/finnish': [
                    'error',
                    {
                        functions: false,
                        methods: false,
                        parameters: true,
                        properties: true,
                        strict: false,
                        variables: true
                    }
                ],
                'rxjs/just': 'off',
                'rxjs/no-async-subscribe': 'error',
                'rxjs/no-compat': 'error',
                'rxjs/no-connectable': 'error',
                'rxjs/no-create': 'error',
                'rxjs/no-cyclic-action': 'error',
                'rxjs/no-explicit-generics': 'error',
                'rxjs/no-exposed-subjects': 'off',
                'rxjs/no-ignored-error': 'off',
                'rxjs/no-ignored-notifier': 'error',
                'rxjs/no-ignored-observable': 'error',
                'rxjs/no-ignored-replay-buffer': 'error',
                'rxjs/no-nested-subscribe': 'error',
                'rxjs/no-ignored-subscribe': 'error',
                'rxjs/no-subclass': 'error',
                'rxjs/no-subject-value': 'off',
                'rxjs/no-topromise': 'error',
                'rxjs/no-unsafe-catch': 'error',
                'rxjs/no-unsafe-first': 'off',
                'rxjs/no-unsafe-switchmap': 'error',
                'rxjs/prefer-observer': 'off',
                'rxjs/suffix-subjects': 'off',
                'rxjs/throw-error': 'error',
                'no-restricted-globals': [
                    'error',
                    {
                        name: 'setInterval',
                        message: 'Avoid using timers. Use `interval` from rxjs instead.'
                    },
                    {
                        name: 'setTimeout',
                        message: 'Avoid using timers. Use `timer` from rxjs instead.'
                    }
                ],
                'no-restricted-properties': [
                    'error',
                    {
                        object: 'window',
                        property: 'setInterval',
                        message: 'Avoid using timers. Use `interval` from rxjs instead.'
                    },
                    {
                        object: 'window',
                        property: 'setTimeout',
                        message: 'Avoid using timers. Use `timer` from rxjs instead.'
                    }
                ]
            }
        }
    ]
};
