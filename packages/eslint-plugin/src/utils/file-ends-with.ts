export function fileEndsWith(context: import('eslint').Rule.RuleContext, suffix: string): boolean {
    const name: string = require('path').basename(context.getFilename());
    return name.endsWith(suffix);
}
