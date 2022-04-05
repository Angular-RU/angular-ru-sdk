import { Rule } from 'eslint';
import * as ESTree from 'estree';

interface NoSuffixFileOptions {
    fileEndsWithList: string[];
}

const NO_SUFFIX_SCHEMA: Rule.RuleMetaData['schema'] = [
    {
        type: 'object',
        additionalProperties: false,
        properties: { fileEndsWithList: { type: 'array' } }
    }
];

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

function getOptions<T>(context: Rule.RuleContext): T {
    return context.options[0] as T;
}

function fileEndsWith(context: Rule.RuleContext, suffix: string): boolean {
    const name: string = require('path').basename(context.getFilename());

    return name.endsWith(suffix);
}
