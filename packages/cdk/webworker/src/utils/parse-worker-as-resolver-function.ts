/* eslint-disable spellcheck/spell-checker */
import { Fn } from '@angular-ru/cdk/typings';

// eslint-disable-next-line complexity
export function parseWorkerAsResolverFunction(worker: Fn): string {
    let resolverString: string = worker.toString();

    if (!resolverString.includes('=>') && !resolverString.startsWith('function')) {
        resolverString = `function ${resolverString}`;
    }

    const generatorRef: string = '(this,void 0,void 0,function*()';

    if (resolverString.includes(generatorRef)) {
        const [left, right]: string[] = resolverString.split(generatorRef) ?? ['', ''];

        const arrowRef: string = '=>';

        if (left?.includes(arrowRef) === true) {
            const [leftArrow]: string[] = left?.split(arrowRef) ?? [''];

            resolverString = `${leftArrow}${arrowRef}__awaiter${generatorRef}${right}`;
        } else {
            const returnRef: string = '{return';
            const [leftArrow]: string[] = left?.split(returnRef) ?? [''];

            resolverString = `${leftArrow}${returnRef} __awaiter${generatorRef}${right}`;
        }
    }

    return resolverString;
}
