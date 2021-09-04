import { asyncExec } from './utils/async-exec';
import { log } from './utils/log';

void (async function main(): Promise<void> {
    log(`[FORMAT]`);
    await asyncExec(`yarn sort-package-json package.json packages/*/package.json dev-infra/*/package.json`);
    await asyncExec(`yarn prettier '**/*.{ts,html,css,scss,md,js,json,yml}' --write`);
})();
