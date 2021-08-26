#!/usr/bin/env zx
import { $, nothrow } from 'zx';

void (async function (): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`[RELEASE]`));
    await nothrow($`yarn generate-changelog`);
    await nothrow($`git add .`);
    await nothrow($`git update-index --again`);
})();
