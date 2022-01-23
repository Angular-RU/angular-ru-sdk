/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['rxjs-angular'],
            rules: {
                // Calling `subscribe` in a component is forbidden; use an `async` pipe instead
                'rxjs-angular/prefer-async-pipe': 'off',
                // This rule effects failures if subscribe is called within
                // a component and the takeUntil-destroyed pattern is not used.
                'rxjs-angular/prefer-takeuntil': [
                    'error',
                    {
                        alias: ['untilDestroyed'],
                        checkComplete: true,
                        checkDecorators: ['Component'],
                        checkDestroy: true
                    }
                ],
                // This rule effects failures if subscribe calls are made with a component and the returned
                // subscription is not composed into a subscription that
                // is unsubscribed when the component is destroyed.
                'rxjs-angular/prefer-composition': ['off', { checkDecorators: ['Component'] }]
            }
        }
    ]
};
