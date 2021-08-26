#!/usr/bin/env zx
import { $, nothrow } from 'zx';

void (async function (): Promise<void> {
    await nothrow($`rm -rf .cache`);
    await nothrow($`rm -rf packages/**/dist packages/**/lib packages/**/.cache`);
    await nothrow($`rm -rf dev-infra/**/dist dev-infra/**/lib dev-infra/**/.cache`);
})();
