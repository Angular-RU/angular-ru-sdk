import { ReplaySubject } from 'rxjs';
import { first } from "rxjs/operators";

class StorageInitializer {
    private subject = new ReplaySubject<void>(1);

    init() {
        this.subject.next();
    }

    onInit(callback: () => void) {
        this.subject.pipe(first()).subscribe(callback);
    }

    reset() {
        this.subject.complete();
        this.subject = new ReplaySubject<void>(1);
    }
}

export const STORAGE_INITIALIZER = new StorageInitializer();
