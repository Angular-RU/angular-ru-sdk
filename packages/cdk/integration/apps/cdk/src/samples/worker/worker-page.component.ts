/* eslint-disable @typescript-eslint/explicit-function-return-type,no-console,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-magic-numbers,@typescript-eslint/typedef,@typescript-eslint/ban-ts-comment */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WorkerThread } from '@angular-ru/cdk/webworker';

@Component({
    selector: 'worker-page',
    templateUrl: './worker-page.component.html',
    styleUrls: ['./worker-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerPageComponent implements OnInit {
    public async ngOnInit() {
        const newVal: number = await new WorkerThread().run(
            (val: number) => {
                console.log('hello from', self.name, val);

                return val + 10;
            },
            5,
            { name: 'workerId#1' }
        );

        console.log(newVal);
    }
}
