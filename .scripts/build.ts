import { asyncExec } from './utils/async-exec';
import { errorHandler } from './utils/error-handler';
import { getPackages } from './utils/get-packages';
import { info } from './utils/info';
import { PackagesGraph } from './utils/packages-graph';

void (async function main(): Promise<void> {
    const graph: PackagesGraph = getPackages();

    for (const packagePath of graph.common) {
        info(`BUILD(successively): ${packagePath}`);
        await asyncExec(`cd ${packagePath} && yarn build:lib`).catch(errorHandler);
    }

    const dependent: Promise<unknown>[] = [];
    for (const packagePath of graph.dependent) {
        info(`BUILD(parallel): ${packagePath}`);
        dependent.push(asyncExec(`cd ${packagePath} && yarn build:lib`).catch(errorHandler));
    }
    await Promise.all(dependent);
})();
