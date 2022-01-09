import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class TooltipDomLeakService {
    private readonly domMemoryLeakTicker$: Subject<void> = new Subject<void>();
    private readonly timeoutCheck: number = 500;
    public actualContainsInDomUidCollections: Set<string> = new Set<string>();

    constructor() {
        this.domMemoryLeakTicker$.pipe(debounceTime(this.timeoutCheck)).subscribe((): void => {
            Array.from(new Set(this.actualContainsInDomUidCollections)).forEach((uid: string): void => {
                const notExistParent: boolean = !document.querySelector(`[data-tooltip-uid="${uid}"]`);

                if (notExistParent) {
                    document.getElementById(uid)?.remove();
                }
            });
        });
    }

    public invalidationOfIrrelevantNodes(): void {
        this.domMemoryLeakTicker$.next();
    }
}
