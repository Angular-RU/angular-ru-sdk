#!/usr/bin/env zx
import { $, nothrow } from 'zx';

void (async function (): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`[LINT]`));
    await nothrow(
        $`yarn eslint --fix --cache --cache-location node_modules/.cache/.eslintcache '**/*.ts' --ignore-pattern '**/file-suites/**'`
    );
})();
