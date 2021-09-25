import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';

const NOT_CI: boolean = process.env['CI_MODE'] !== 'true';

void (async function main(): Promise<void> {
    info(`POST INSTALL`);

    const commands: string[] = [`yarn husky install`, `yarn ngcc --async`];

    if (NOT_CI) {
        commands.unshift(`yarn clean`);
        commands.push(`yarn verify:ng`, `yarn build`);
    } else {
        info('CI mode running, actual you need run `yarn build` as manual');
    }

    for (const command of commands) {
        await asyncExec(command);
    }
})();
