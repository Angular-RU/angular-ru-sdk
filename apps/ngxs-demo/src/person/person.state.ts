import {inject, Injectable} from '@angular/core';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {State} from '@ngxs/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {PersonService} from './person.service';
import {PersonModel} from './person-model';

@StateRepository()
@State<PersonModel>({
    name: 'person',
    defaults: {title: null!, description: null!},
})
@Injectable()
export class PersonState extends NgxsImmutableDataRepository<PersonModel> {
    private readonly personService = inject(PersonService);

    public getContent(): Observable<PersonModel> {
        return this.personService
            .fetchAll()
            .pipe(tap((content: PersonModel): void => this.setState(content)));
    }
}
