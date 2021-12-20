import { Fn } from '@angular-ru/cdk/typings';

import { parseWorkerAsResolverFunction } from './parse-worker-as-resolver-function';

// eslint-disable-next-line max-lines-per-function
export function createWorkerUrl(worker: Fn): string {
    const resolverString: string = parseWorkerAsResolverFunction(worker);

    // eslint-disable-next-line spellcheck/spell-checker
    const webWorkerTemplate: string = `
        var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };

        try {
            const workerResolver = (${resolverString});

            self.addEventListener('message', async function(message) {
                try {
                  const result = await workerResolver(message.data);
                  self.postMessage(result);
                } catch (err) {
                  console.error('Error while getting the result from the worker#' + self.name, err);
                }
            });
        } catch (err) {
            console.error('Error while creating the worker#' + self.name, err);
        }
    `;

    const blob: Blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });

    return URL.createObjectURL(blob);
}
