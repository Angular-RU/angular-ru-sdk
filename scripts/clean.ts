import { asyncExec } from './utils/async-exec';
import { log } from './utils/log';
import { noThrow } from './utils/no-throw';

void (async function main(): Promise<void> {
    log(`[CLEAN]`);
    await asyncExec(`rm -rf .cache`).catch(noThrow);
    await asyncExec(`rm -rf packages/**/dist packages/**/lib packages/**/.cache`).catch(noThrow);
    await asyncExec(`rm -rf dev-infra/**/dist dev-infra/**/lib dev-infra/**/.cache`).catch(noThrow);
})();
