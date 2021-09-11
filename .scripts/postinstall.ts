import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';

void (async function main(): Promise<void> {
    info(`POST INSTALL`);

    const commands: string[] = [
        `yarn clean`,
        `yarn husky install`,
        `yarn ngcc --async`,
        `yarn verify:ng`,
        `yarn build`
    ];

    for (const command of commands) {
        await asyncExec(command);
    }
})();
