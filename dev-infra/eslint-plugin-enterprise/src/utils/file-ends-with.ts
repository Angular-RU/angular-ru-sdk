import { Rule } from 'eslint';

export function fileEndsWith(context: Rule.RuleContext, suffix: string): boolean {
    const name: string = require('path').basename(context.getFilename());

    return name.endsWith(suffix);
}
