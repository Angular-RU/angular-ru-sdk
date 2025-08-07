import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {PersonModel} from './person-model';

@Injectable({
    providedIn: 'root',
})
export class PersonService {
    private readonly httpService = inject(HttpClient);

    public fetchAll(): Observable<PersonModel> {
        return this.httpService
            .get<{data: PersonModel}>('./assets/person.json')
            .pipe(map((response: {data: PersonModel}): PersonModel => response.data));
    }
}
