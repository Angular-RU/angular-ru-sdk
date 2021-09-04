import { asyncExec } from './utils/async-exec';
import { log } from './utils/log';

void (async function main(): Promise<void> {
    log('[LINT]');
    await asyncExec(
        `yarn eslint --fix --cache --cache-location node_modules/.cache/.eslintcache '**/*.ts' --ignore-pattern '**/file-suites/**'`
    );
})();
