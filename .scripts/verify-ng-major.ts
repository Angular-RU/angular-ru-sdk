import { asyncExec, AsyncExecOptions } from './utils/async-exec';
import { getPackages } from './utils/get-packages';
import { info } from './utils/info';
import { debug } from './utils/debug';
import { log } from './utils/log';

void (async function main(): Promise<void> {
    info(`CHECK ALIGNED NG VERSION`);
    const options: AsyncExecOptions = { shareStd: false };
    const ngccVersion: string = await asyncExec(`echo $(yarn -s ngcc --version)`, options);
    info(`Current version for Angular: ${ngccVersion}`);
    log(`-------------------------`);

    for (const packagePath of getPackages()) {
        const packageName: string = packagePath.split('/')?.[1] ?? '';
        const localVersion: string = await asyncExec([`cd ${packagePath}`, `yarn -s npe version`], options);
        const globalMajorNgccVersion: number = Number(ngccVersion?.split('.')?.[0]) || 0;
        const localMajorVersion: number = Number(localVersion?.split('.')?.[0]) || 0;

        if (globalMajorNgccVersion > localMajorVersion) {
            debug(`Old version for @angular-ru/${packageName}: ${localVersion}`);
            await asyncExec(
                [`cd ${packagePath}`, `yarn -s version --major --no-git-tag-version --no-commit-hooks`],
                options
            );
            const newVersion: string = await asyncExec([`cd ${packagePath}`, `yarn -s npe version`], options);

            info(`New version for @angular-ru/${packageName}: ${newVersion}`);
        } else if (globalMajorNgccVersion === localMajorVersion) {
            info(`Current version for @angular-ru/${packageName}: ${localVersion}`);
        } else {
            throw new Error('unsupported operation');
        }

        log(`-------------------------`);
    }
})();
