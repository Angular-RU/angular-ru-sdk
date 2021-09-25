import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';

void (async function main(): Promise<void> {
    info(`FORMAT`);

    await Promise.all([
        asyncExec(`yarn sort-package-json package.json packages/*/package.json dev-infra/*/package.json`),
        asyncExec(`yarn prettier '**/*.{ts,html,css,scss,md,js,json,yml}' --write`)
    ]);
})();
