#!/usr/bin/env zx
import { $, nothrow } from 'zx';

void (async function (): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`[FORMAT]`));
    await nothrow($`yarn sort-package-json package.json packages/*/package.json dev-infra/*/package.json`);
    await nothrow($`yarn prettier '**/*.{ts,html,css,scss,md,js,json,yml}' --write`);
})();
