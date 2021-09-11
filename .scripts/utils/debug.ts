import * as chalk from 'chalk';

export function debug(text: string): void {
    // eslint-disable-next-line no-console
    console.log(chalk.default.blue?.('[DEBUG]'), text);
}
