import { TestBed } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/http';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('[TEST]: HTTP Client', () => {
    @Injectable()
    class ApiUsersClient extends DataHttpClient {}

    @Component({
        selector: 'users',
        template: ''
    })
    class UserComponent {
        constructor(public readonly api: ApiUsersClient) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiUsersClient],
            declarations: [UserComponent],
            imports: [CommonModule, HttpClientModule, DataHttpClientModule.forRoot()]
        });

        TestBed.compileComponents();
    });

    it('correct inject users http client', () => {
        const users: UserComponent = TestBed.createComponent(UserComponent).componentInstance;
        const client: ApiUsersClient = TestBed.inject(ApiUsersClient);
        expect(users.api).toEqual(client);
    });
});
