#!/usr/bin/env zx
import { $, cd, nothrow } from 'zx';

void (async function (): Promise<void> {
    const { packages }: typeof import('../package.json') = require('../package.json');

    for (const packagePath of packages) {
        // eslint-disable-next-line no-console
        console.log(chalk.blue(`[SYMLINK]: ${packagePath}`));
        cd(packagePath);
        await nothrow($`yarn symlink`);
    }
})();
