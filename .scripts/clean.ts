import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';
import { noThrow } from './utils/no-throw';

void (async function main(): Promise<void> {
    info(`CLEAN OLD BUILDS/CACHE`);

    const commands: string[] = [
        `rm -rf node_modules/.cache`,
        `rm -rf packages/**/dist packages/**/.cache packages/**/node_modules/.cache`,
        `rm -rf dev-infra/**/dist dev-infra/**/.cache packages/**/dev-infra/.cache`
    ];

    for (const command of commands) {
        await asyncExec(command).catch(noThrow);
    }
})();
