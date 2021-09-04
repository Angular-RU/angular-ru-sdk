import { asyncExec } from './utils/async-exec';
import { log } from './utils/log';
import { noThrow } from './utils/no-throw';

void (async function main(): Promise<void> {
    log(`[CLEAN]`);

    const commands: string[] = [
        `rm -rf .cache`,
        `rm -rf packages/**/dist packages/**/lib packages/**/.cache packages/**/node_modules`,
        `rm -rf dev-infra/**/dist dev-infra/**/lib dev-infra/**/.cache dev-infra/**/node_modules`
    ];

    for (const command of commands) {
        await asyncExec(command).catch(noThrow);
    }
})();
