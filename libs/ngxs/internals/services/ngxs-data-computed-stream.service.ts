import {inject, Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngxs/store';
import {BehaviorSubject, Subscription} from 'rxjs';

@Injectable()
export class NgxsDataSequence implements OnDestroy {
    private readonly subscription: Subscription | null = null;
    public readonly sequence$ = new BehaviorSubject<number>(0);

    constructor() {
        const store = inject(Store, {optional: true});

        if (store) {
            this.subscription = store.subscribe((): void => this.updateSequence());
        }
    }

    public get sequenceValue(): number {
        return this.sequence$.getValue();
    }

    public ngOnDestroy(): void {
        this.sequence$.next(0);
        this.subscription?.unsubscribe();
    }

    public updateSequence(): void {
        this.sequence$.next(this.sequenceValue + 1);
    }
}
