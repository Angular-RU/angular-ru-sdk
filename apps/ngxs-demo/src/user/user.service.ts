import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {delay, map} from 'rxjs/operators';

import {UserModel} from './user-model';

@Injectable()
export class UserService {
    private readonly SIMULATE_REQUEST_DELAY: number = 2000;
    constructor(private readonly httpService: HttpClient) {}

    public loadUser(): Observable<UserModel> {
        return this.httpService.get<{data: UserModel}>('/assets/user.json').pipe(
            delay(this.SIMULATE_REQUEST_DELAY),
            map((response: {data: UserModel}): UserModel => response.data),
        );
    }
}
