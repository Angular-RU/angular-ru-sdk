import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {TableUpdateSchema} from '../../interfaces/table-builder.external';

@Injectable({providedIn: 'root'})
export class NgxTableViewChangesService {
    public events$: Subject<TableUpdateSchema> = new Subject<TableUpdateSchema>();
    public update(state: TableUpdateSchema): void {
        this.events$.next(state);
    }
}
