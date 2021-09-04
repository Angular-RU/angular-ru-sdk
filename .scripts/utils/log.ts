import * as chalk from 'chalk';

export function log(text: string): void {
    // eslint-disable-next-line no-console
    console.log(chalk.default.blue(text));
}
