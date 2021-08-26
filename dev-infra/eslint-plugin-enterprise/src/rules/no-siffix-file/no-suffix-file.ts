import { Rule } from 'eslint';
import * as ESTree from 'estree';

import { fileEndsWith } from '../../utils/file-ends-with';
import { getOptions } from '../../utils/get-options';
import { NoSuffixFileOptions } from './no-suffix-file-options';
import { NO_SUFFIX_SCHEMA } from './no-suffix-schema';

export function noSuffixFile(): Rule.RuleModule {
    return {
        meta: { schema: NO_SUFFIX_SCHEMA },
        create: (context: Rule.RuleContext): Rule.RuleListener => ({
            Program: (node: ESTree.Program): void => {
                const fileEndsWithList: string[] = getOptions<NoSuffixFileOptions>(context).fileEndsWithList;

                for (const suffix of fileEndsWithList) {
                    if (fileEndsWith(context, suffix)) {
                        context.report({ node, message: `Files doesn't must end with by ${suffix}` });
                        break;
                    }
                }
            }
        })
    };
}
