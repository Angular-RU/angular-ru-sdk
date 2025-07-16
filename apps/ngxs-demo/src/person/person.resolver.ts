import {inject} from '@angular/core';
import type {ResolveFn} from '@angular/router';

import {PersonState} from './person.state';
import type {PersonModel} from './person-model';

export const personResolver: ResolveFn<PersonModel> = () =>
    inject(PersonState).getContent();
