import {HttpHeaders, HttpParams} from '@angular/common/http';
import {
    buildUrl,
    ensurePathByPathVariables,
    getHttpHeader,
    getHttpParams,
    getPathWithoutQueryParams,
    isAbsolutePath,
    isLocalhost,
    makeUrlSegments,
    parseQueryParams,
    replaceDoubleSlash,
    replaceLeadingAndTrailingSlashes,
} from '@angular-ru/cdk/http/utils';
import {PlainObject} from '@angular-ru/cdk/typings';

describe('[TEST]: http utils', () => {
    it('isLocalhost', () => {
        expect(isLocalhost('https://localhost:4200')).toBe(true);
        expect(isLocalhost('https://0.0.0.0:4200')).toBe(true);
        expect(isLocalhost('https://127.0.0.1:4200')).toBe(true);
        expect(isLocalhost('https://google.com')).toBe(false);
        expect(isLocalhost('https://google.com/localhost')).toBe(false);
    });

    it('getPathWithoutQueryParams', () => {
        expect(getPathWithoutQueryParams('http://hello/world/todo/1/all')).toBe(
            'http://hello/world/todo/1/all',
        );
        expect(getPathWithoutQueryParams('http://hello/world/todo/1/all/')).toBe(
            'http://hello/world/todo/1/all/',
        );
        expect(getPathWithoutQueryParams('http://hello/world/todo/1/all?')).toBe(
            'http://hello/world/todo/1/all',
        );
        expect(getPathWithoutQueryParams('http://hello/world/todo/1/all/?')).toBe(
            'http://hello/world/todo/1/all/',
        );
        expect(
            getPathWithoutQueryParams(
                'http://hello/world/todo/1/all?pageSize=10&pageIndex=0',
            ),
        ).toBe('http://hello/world/todo/1/all');
    });

    it('getUrlSegments', () => {
        expect(makeUrlSegments({})).toEqual({
            hostUrl: 'http://localhost',
            baseUrl: '',
            restUrl: '',
            pathUrl: '',
        });

        expect(
            makeUrlSegments({
                hostUrl: 'http://hello_world',
                baseUrl: 'api',
            }),
        ).toEqual({
            hostUrl: 'http://hello_world',
            baseUrl: 'api',
            restUrl: '',
            pathUrl: '',
        });

        expect(
            makeUrlSegments(
                {
                    hostUrl: 'http://hello_world',
                    baseUrl: 'api',
                },
                'auth',
            ),
        ).toEqual({
            hostUrl: 'http://hello_world',
            baseUrl: 'api',
            restUrl: 'auth',
            pathUrl: '',
        });

        expect(
            makeUrlSegments(
                {
                    hostUrl: 'http://hello_world',
                    baseUrl: 'api',
                },
                'user',
                'update',
            ),
        ).toEqual({
            hostUrl: 'http://hello_world',
            baseUrl: 'api',
            restUrl: 'user',
            pathUrl: 'update',
        });
    });

    it('isAbsolutePath', () => {
        expect(isAbsolutePath('/api')).toBe(false);
        expect(isAbsolutePath('//hello_world')).toBe(false);
        expect(isAbsolutePath('http://hello_world')).toBe(true);
    });

    it('replaceDoubleSlash', () => {
        expect(replaceDoubleSlash('https://a///b//c/d/')).toBe('https://a/b/c/d/');
        expect(replaceDoubleSlash('////a///b//c/d/')).toBe('/a/b/c/d/');
    });

    it('buildUrl', () => {
        expect(buildUrl(makeUrlSegments({}, '////a///b//c/d/'))).toBe(
            'http://localhost/a/b/c/d',
        );
        expect(
            buildUrl(makeUrlSegments({baseUrl: 'api-backend'}, '////a///b//c/d')),
        ).toBe('http://localhost/api-backend/a/b/c/d');

        expect(
            buildUrl(
                makeUrlSegments(
                    {hostUrl: 'https://127.0.0.0:8030'},
                    '',
                    '////a///b//c/d?quick',
                ),
            ),
        ).toBe('https://127.0.0.0:8030/a/b/c/d');
    });

    describe('getHttpHeader', () => {
        it('case #1', () => {
            const headers: HttpHeaders = getHttpHeader({a: '1', b: '2'});

            expect(headers.keys()).toEqual(['a', 'b']);
            expect(headers.get('a')).toBe('1');
            expect(headers.get('b')).toBe('2');
        });

        it('case #2', () => {
            const params: HttpParams = getHttpParams('/todos/get?pageSize=5&value=2', {
                pageIndex: 0,
            });

            expect(params.keys()).toEqual(['pageSize', 'value', 'pageIndex']);
            expect(params.get('pageSize')).toBe('5');
            expect(params.get('value')).toBe('2');
            expect(params.get('pageIndex')).toBe('0');
        });
    });

    it('parseQueryParams', () => {
        const queryParams: PlainObject = parseQueryParams(
            '/todos/get?pageSize=5&value=2',
        );

        expect(queryParams).toEqual({pageSize: '5', value: '2'});
    });

    it('ensurePathByPathVariables', () => {
        const map = new Map();

        map.set('id', 5);
        map.set('newId', 6);

        expect(ensurePathByPathVariables('/a/{newId}/b/{id}/d', map)).toBe('/a/6/b/5/d');
        expect(ensurePathByPathVariables('/a/{invalidName}', map)).toBe(
            '/a/{invalidName}',
        );
    });

    describe('removeLeadingAndTrailingSlashes', () => {
        it('case #1', () => {
            expect(replaceLeadingAndTrailingSlashes('')).toBe('');
        });

        it('case #2', () => {
            expect(replaceLeadingAndTrailingSlashes('/')).toBe('');
        });

        it('case #3', () => {
            expect(replaceLeadingAndTrailingSlashes('//')).toBe('');
        });

        it('case #4', () => {
            expect(replaceLeadingAndTrailingSlashes('//ad/example///')).toBe(
                'ad/example',
            );
        });
    });
});
