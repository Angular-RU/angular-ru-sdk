import { ChildProcess, exec, ExecException } from 'child_process';

type Resolve = (value: string) => void;
type Reject = (value: unknown) => void;

export interface AsyncExecOptions {
    shareStd: boolean;
}

export function asyncExec(command: string | string[], options: AsyncExecOptions = { shareStd: true }): Promise<string> {
    const preparedCmd: string = Array.isArray(command) ? command.join(' && ') : command;

    return new Promise((resolve: Resolve, reject: Reject): void => {
        const childProcess: ChildProcess = exec(
            preparedCmd,
            (error: ExecException | null, stdout: string, stderr: string): void => {
                if (error) {
                    reject(stderr);
                    return;
                }

                resolve(stdout.trim());
            }
        );

        if (options.shareStd) {
            childProcess.stdout?.pipe(process.stdout);
            childProcess.stderr?.pipe(process.stderr);
        }
    });
}
