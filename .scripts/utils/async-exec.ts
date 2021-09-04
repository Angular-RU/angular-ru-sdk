import { ChildProcess, exec, ExecException } from 'child_process';

type Resolve = (value: string) => void;
type Reject = (value: unknown) => void;

export function asyncExec(command: string): Promise<string> {
    return new Promise((resolve: Resolve, reject: Reject): void => {
        const childProcess: ChildProcess = exec(
            command,
            (error: ExecException | null, stdout: string, stderr: string): void => {
                if (error) {
                    reject(stderr);
                    return;
                }

                resolve(stdout.trim());
            }
        );

        childProcess.stdout?.pipe(process.stdout);
        childProcess.stderr?.pipe(process.stderr);
    });
}
