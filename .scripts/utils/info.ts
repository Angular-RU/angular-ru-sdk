import * as chalk from 'chalk';

export function info(text: string): void {
    // eslint-disable-next-line no-console
    console.log(chalk.default.green?.('[INFO]'), text);
}
