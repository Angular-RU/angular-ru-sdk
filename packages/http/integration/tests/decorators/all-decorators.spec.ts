import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/http';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    Delete,
    Get,
    Patch,
    PathVariable,
    Post,
    Put,
    RequestBody,
    RequestParam,
    RestClient
} from '@angular-ru/http/decorators';

describe('[TEST]: HTTP decorators for client', () => {
    const MOCK_API: string = 'http://localhost';
    let client: ApiUsersClient | null = null;
    let httpMock: HttpTestingController;
    let req: TestRequest;

    interface User {
        id: number;
        name: string;
    }

    @Injectable()
    @RestClient('/users')
    class ApiUsersClient extends DataHttpClient {
        @Get('/')
        public findAllUsers(): Observable<User[]> {
            return this.restTemplate();
        }

        @Get()
        public findAllUsersWithPaginator(
            @RequestParam('index') _pageIndex: number,
            @RequestParam('size') _pageSize: number
        ): Observable<User[]> {
            return this.restTemplate({ queryParams: { size: 5 } });
        }

        @Get('/{id}')
        public findByIdUser(@PathVariable('id') _id: number): Observable<User> {
            return this.restTemplate();
        }

        @Get('/')
        public getFirstUser(): Observable<User> {
            return this.restTemplate<User[]>().pipe(map((value) => value[0]));
        }

        @Post('/{id}')
        public createUser(@PathVariable('id') _id: number, @RequestBody() _body: Partial<User>): Observable<void> {
            return this.restTemplate();
        }

        @Put('/{id}')
        public saveUser(@PathVariable('id') _id: number, @RequestBody() _body: User): Observable<void> {
            return this.restTemplate();
        }

        @Delete('/{id}')
        public deleteByIdUser(@PathVariable('id') _id: number): Observable<void> {
            return this.restTemplate();
        }

        @Patch('/{id}')
        public mutateUser(@PathVariable('id') _id: number, @RequestBody() _body: Partial<User>): Observable<void> {
            return this.restTemplate();
        }
    }

    @Component({
        selector: 'events',
        template: ''
    })
    class UsersComponent {
        constructor(public readonly api: ApiUsersClient) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UsersComponent],
            imports: [CommonModule, HttpClientTestingModule, DataHttpClientModule.forRoot([ApiUsersClient])]
        });

        TestBed.compileComponents();
        client = TestBed.inject(ApiUsersClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be correct send GET request with decorator', fakeAsync(() => {
        client?.findAllUsers().subscribe((response: User[]) => {
            expect(response).toEqual([
                { id: 1, name: 'a' },
                { id: 2, name: 'b' }
            ]);
            expect(req.request.method).toEqual('GET');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/`);
        req.flush([
            { id: 1, name: 'a' },
            { id: 2, name: 'b' }
        ]);

        tick(100);

        client?.getFirstUser().subscribe((response: User) => {
            expect(response).toEqual({ id: 1, name: 'a' });
            expect(req.request.method).toEqual('GET');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/`);
        req.flush([
            { id: 1, name: 'a' },
            { id: 2, name: 'b' }
        ]);

        tick(100);
    }));

    it('should be correct GET request with path variable', fakeAsync(() => {
        client?.findByIdUser(2).subscribe((response: User) => {
            expect(response).toEqual({ id: 2, name: 'b' });
            expect(req.request.method).toEqual('GET');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/2`);
        req.flush({ id: 2, name: 'b' });

        tick(100);
    }));

    it('should be correct POST request with path variable', fakeAsync(() => {
        client?.createUser(2, { id: 2, name: 'b' }).subscribe((): void => {
            expect(req.request.body).toEqual({ id: 2, name: 'b' });
            expect(req.request.method).toEqual('POST');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/2`);
        req.flush(null);

        tick(100);
    }));

    it('should be correct PUT request with path variable', fakeAsync(() => {
        client?.saveUser(1, { id: 1, name: 'a' }).subscribe((): void => {
            expect(req.request.body).toEqual({ id: 1, name: 'a' });
            expect(req.request.method).toEqual('PUT');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/1`);
        req.flush(null);

        tick(100);
    }));

    it('should be correct DELETE request with path variable', fakeAsync(() => {
        client?.deleteByIdUser(3).subscribe((): void => {
            expect(req.request.method).toEqual('DELETE');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/3`);
        req.flush(null);

        tick(100);
    }));

    it('should be correct PATCH request with path variable', fakeAsync(() => {
        client?.mutateUser(4, { name: 'a' }).subscribe((): void => {
            expect(req.request.body).toEqual({ name: 'a' });
            expect(req.request.method).toEqual('PATCH');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/4`);
        req.flush(null);

        tick(100);
    }));

    it('should be correct GET request with request params', fakeAsync(() => {
        client?.findAllUsersWithPaginator(4, 20).subscribe((): void => {
            expect(req.request.params.toString()).toEqual('index=4&size=5');
            expect(req.request.method).toEqual('GET');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/?index=4&size=5`);
        req.flush(null);

        tick(100);
    }));

    afterEach(() => {
        httpMock.verify();
    });
});
