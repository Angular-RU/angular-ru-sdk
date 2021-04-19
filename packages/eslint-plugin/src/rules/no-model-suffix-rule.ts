import { Any } from '@angular-ru/common/typings';
import { Rule } from 'eslint';
import * as ESTree from 'estree';

import { fileEndsWith } from '../utils/file-ends-with';

export function noModelSuffixRule(): Any {
    return {
        meta: { schema: [] },
        create: (context: Rule.RuleContext): Rule.RuleListener => ({
            Program: (node: ESTree.Program): void => {
                if (fileEndsWith(context, '.model.ts')) {
                    context.report({ node, message: `Files doesn't must end with *.model.ts` });
                }
            }
        })
    };
}
