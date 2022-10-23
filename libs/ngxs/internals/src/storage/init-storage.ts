import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

class StorageInitializer {
    // eslint-disable-next-line rxjs/finnish
    private subject: ReplaySubject<void> = new ReplaySubject<void>(1);

    public init(): void {
        this.subject.next();
    }

    public onInit(callback: () => void): void {
        this.subject.pipe(first()).subscribe(callback);
    }

    public reset(): void {
        this.subject.complete();
        this.subject = new ReplaySubject<void>(1);
    }
}

export const STORAGE_INITIALIZER: StorageInitializer = new StorageInitializer();
