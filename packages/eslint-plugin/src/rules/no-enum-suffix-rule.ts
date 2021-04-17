import { Any } from '@angular-ru/common/typings';
import { Rule } from 'eslint';

import { fileEndsWith } from '../utils/file-ends-with';

export function noEnumSuffixRule(): Any {
    return {
        meta: { schema: [] },
        create: (context: Rule.RuleContext): Any => ({
            Program: (node: Rule.Node): Any => {
                if (fileEndsWith(context, '.enum.ts')) {
                    context.report({ node, message: `Files doesn't must end with *.enum.ts` });
                }
            }
        })
    };
}
