import { asyncExec } from './utils/async-exec';
import { errorHandler } from './utils/error-handler';
import { getPackages } from './utils/get-packages';
import { info } from './utils/info';
import { PackagesGraph } from './utils/packages-graph';

void (async function main(): Promise<void> {
    const graph: PackagesGraph = getPackages();
    const packages: string[] = [...graph.common, ...graph.dependent];

    for (const packagePath of packages) {
        info(`SYMLINK: ${packagePath}`);
        await asyncExec(`cd ${packagePath} && yarn symlink`).catch(errorHandler);
    }
})();
